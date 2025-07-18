import express, { Response,Request } from "express";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { GoogleGenAI } from "@google/genai";
import { QdrantClient } from '@qdrant/js-client-rest';
import { Together } from "together-ai"


const app = express();
const PORT = 9000;
app.use(cors());


// Embedding Model Client
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// Qdrant Client 
const qdrantClient = new QdrantClient({
    url : process.env.QDRANT_CLIENT_URL,
    apiKey : process.env.QDRANT_API_KEY,
});


// ai Client for chat

const together = new Together({
    apiKey : process.env.GPT4_API_KEY!
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix +'-'+  file.originalname)
  }
})


const upload = multer({ storage: storage })


// Queue Stuff
const myQueue = new Queue('pdf-queue');


app.post('/upload-file',upload.single('file'),async (req:Request,res:Response)=>{
    try{
        const file = req.file;
        await myQueue.add(`${file?.originalname}`,
            {name : file?.originalname,
            path : file?.path,
            destination : file?.destination,
        });
        res.status(200).json({msg: "PDF Processing!"});
        return;
    }catch(error){
        res.status(400).json({error});
        return;
    }
});



app.get('/chat-pdf',async (req:Request,res:Response)=>{
    // const userMessage = req.query.message as string;
    const userMessage = " give me Batting points rules?"

    if(!userMessage){
        res.status(400).json({msg:"User Query Not Found!"});
        return;
    }
    // embed the user query.
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: `${userMessage}`,
    });

    // user query embeddings.
    const queryEmbeddings : any = response!.embeddings![0].values;

    // search the queryembedding in qdrant db.
    const searchResults = await qdrantClient.search("test_collection3",{
        vector:queryEmbeddings,
        limit:3,
        with_payload:true,
    });

    console.log("Search Results : ",searchResults);
    
    const matchedChunks = searchResults.map((r:any) => r.payload?.fileData?.pageContent).filter(Boolean);

    const SYSTEM_PROMPT = `You're an Helpful Assistant!. So you have to Answer the Query Based on Given PDF content.
CONTEXT : ${JSON.stringify(matchedChunks)}
`
    const chatResponse = await together.chat.completions.create({
        messages:[
            {"role":"system",content :SYSTEM_PROMPT},
            {"role":"user",content:userMessage},             
        ],
        model:"mistralai/Mixtral-8x7B-Instruct-v0.1"    
    });

    const raw = chatResponse?.choices[0]?.message?.content;
    console.log(matchedChunks);
    console.log(raw);
    res.json({raw});
   


})


app.listen(PORT,()=>{console.log(`Server Started at ${PORT}`)});

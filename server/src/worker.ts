import { Worker } from 'bullmq';
import IORedis from "ioredis"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { QdrantClient } from '@qdrant/js-client-rest';
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Redis Connection
const connection = new IORedis({maxRetriesPerRequest:null});

// Embedding Model Client
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});


// Qdrant Client 
const qdrantClient = new QdrantClient({
    url : process.env.QDRANT_CLIENT_URL,
    apiKey : process.env.QDRANT_API_KEY,
});

const worker = new Worker(
    'pdf-queue',
    async job =>{
        console.log(job.data);
        // get the path of pdf 
        const path = job.data.path;
        console.log("Path : ",path);
        // retrive data
        const loader = new PDFLoader(path);
        
        // load the document
        const docs = await loader.load();
        console.log("DOCS",docs[0]);

        // chunk the pdf data
        // convert that chunk into vector embeddings.
        
       const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: `${docs[0]}`,
    });
    // console.log(response.embeddings);
        // upload it into qdrant db.
        if(response.embeddings){
            const embeddings = response.embeddings[0].values
            console.log("FINAL EMBEDDINGS : ",embeddings);
            console.log("Embedding length:", embeddings!.length); 

            try{
                // if you want to create collection call this function : createCollectionForQdrantDB();
                const operationInfo = await qdrantClient.upsert("test_collection3",{
                    wait:true,
                    points:[ { id: Number(job.id), vector: embeddings!, payload: { fileName: job.data.name } },]
                });
                
                console.log("Operation INFO : ",operationInfo);
            
            }catch(error){
                console.log(error);
            }
        }
    },
    {connection}
);


worker.on('completed',job =>{
    console.log(`${job.id} has completed.`);
}); 


async function createCollectionForQdrantDB(){
    await qdrantClient.createCollection("test_collection3",{
        vectors:{size:3072,distance:"Dot"},
    })
}
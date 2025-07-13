import express, { Response,Request } from "express";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq"


const app = express();
const PORT = 9000;
app.use(cors());

// Queue Stuff
const myQueue = new Queue('pdf-queue');

const upload = multer({dest:'uploads/'});

app.post('/upload-file',upload.single('file'),async (req:Request,res:Response)=>{
    try{
        const file = req.file;
        
        console.log(file);
        await myQueue.add(`${file?.originalname}`,{file : file});
        res.status(200).json({msg: "PDF Processing!"});
        return;
    }catch(error){
        res.status(400).json({error});
        return;
    }
})


app.listen(PORT,()=>{console.log(`Server Started at ${PORT}`)});

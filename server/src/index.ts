import express, { Response,Request } from "express";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";

const app = express();
const PORT = 9000;
app.use(cors());



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
            destination : file?.destination
        });
        res.status(200).json({msg: "PDF Processing!"});
        return;
    }catch(error){
        res.status(400).json({error});
        return;
    }
})


app.listen(PORT,()=>{console.log(`Server Started at ${PORT}`)});

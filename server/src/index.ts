import express, { Response,Request } from "express";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors);
const PORT = 9000;

const upload = multer();
app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({msg:"Server up!"});
    return;
});

app.post('/upload-file',upload.single('pdf'),async (req:Request,res:Response)=>{
    try{
        const file = req.file;
        
        return;
    }catch(error){
        res.status(400).json({error});
        return;
    }
})


app.listen(PORT,()=>{console.log(`Server Started at ${PORT}`)});

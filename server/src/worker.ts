import { Worker } from 'bullmq';
import IORedis from "ioredis"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { QdrantClient } from '@qdrant/js-client-rest';

const connection = new IORedis({maxRetriesPerRequest:null});

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
        // upload it into qdrant db.




    },
    {connection}
);


worker.on('completed',job =>{
    console.log(`${job.id} has completed.`);
}); 
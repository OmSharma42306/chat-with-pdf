import { Worker } from "bullmq";
import IORedis from "ioredis";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ai,qdrantClient } from "./clients";
import dotenv from "dotenv";

dotenv.config();

// Redis Connection
const connection = new IORedis({ maxRetriesPerRequest: null });

// to create collection in Qdrant DB
async function createCollectionForQdrantDB() {
  await qdrantClient.createCollection("test_collection3", {
    vectors: { size: 3072, distance: "Dot" },
  });
}

// Worker Stuff

const worker = new Worker(
  "pdf-queue",
  async (job) => {
    console.log(job.data);
    // get the path of pdf
    const path = job.data.path;
    // retrive data
    const loader = new PDFLoader(path);

    // load the document
    const docs = await loader.load();
    // console.log("DOCS",docs);

    // chunk the pdf data

    const points: any = [];
    for (let i = 0; i < docs.length; i++) {
      const content = docs[i].pageContent;

     // convert that per chunk into vector embeddings.

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: `${content}`,
    });

    if (response.embeddings) {
      const vector = response.embeddings[0].values;
      console.log("FINAL EMBEDDINGS : ", vector);
      console.log("Embedding length:", vector!.length);

      try {
        points.push({
          id: Number(`${job.id}${i}`),
          vector,
          payload: {
            fileName: job.data.name,
            fileData: {
              pageContent: content,
            },
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    // if you want to create collection call this function : createCollectionForQdrantDB();
    // await createCollectionForQdrantDB() ;
    const operationInfo = await qdrantClient.upsert("test_collection3", {
      wait: true,
      points: points,
    });

    console.log("Operation INFO : ", operationInfo);
    console.log("Upserted Points:", points.length);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed.`);
});


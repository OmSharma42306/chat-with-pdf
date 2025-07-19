import { QdrantClient } from '@qdrant/js-client-rest';
import { GoogleGenAI } from "@google/genai";
import { Together } from "together-ai"
import dotenv from "dotenv"
dotenv.config();

// Qdrant Client 
export const qdrantClient = new QdrantClient({
    url : process.env.QDRANT_CLIENT_URL,
    apiKey : process.env.QDRANT_API_KEY,
});


// Embedding Model Client
export const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});


// ai Client for chat
export const together = new Together({
    apiKey : process.env.GPT4_API_KEY!
});


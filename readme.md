# 🧠 Chat with PDF using Next.js & Vector DB

Build an AI-powered application that allows users to chat with the contents of a PDF. The system uses **Next.js** for the frontend/backend, a **Vector Database** for semantic search, and **OpenAI (or similar)** for generating responses.

---

## 🚀 Features

- 📄 Upload and parse PDF files
- 🧬 Store and search content in a vector database
- 💬 AI chatbot that answers based on the uploaded PDF
- ⚡ Built with Next.js (API Routes + App Router compatible)
- 🧠 Embedding with OpenAI / HuggingFace
- 🌐 Serverless-ready architecture

---

## 🏗️ Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| Next.js     | Frontend + API                   |
| LangChain   | Text chunking + embedding        |
| Qdrant      | semantic search                  |
| OpenAI API  | Embedding + Chat Completion      |
| pdf-parse   | Using Langchain                  |
| Tailwind CSS| Styling                          |

---

# Instructions 

- 1) Run Redis Locally on Docker Container.
    docker run --name=myredis -p 6379:6379 redis

- `cd server`
- 2) Run `tsc -b`
- 3) Run `node dist/index.js ` for server Start.
- 4) Run `node dist/worker.js` for queue worker start.

- `cd chat-pdf`
- 5) Run `npm run dev` and upload pdf and see logs on backend worker queues. and if you want to chat and test the stuff.

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
| Pinecone / Chroma | Vector DB for semantic search |
| OpenAI API  | Embedding + Chat Completion      |
| pdf-parse / pdfjs | PDF parsing in Node.js     |
| Tailwind CSS | Styling                         |

---

## 📁 Folder Structure

```bash
📦project-root
 ┣ 📂components         # UI components
 ┣ 📂lib                # PDF parser, embedding utils
 ┣ 📂pages/api          # Upload, embed, query APIs
 ┣ 📂public             # Static assets
 ┣ 📂styles             # Global styles
 ┣ 📜.env.local         # API keys and environment vars
 ┣ 📜next.config.js     # Next.js config
 ┗ 📜README.md


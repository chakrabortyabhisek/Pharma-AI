# 🩺 PharmaAI – AI Medical Assistant

**PharmaAI** is an AI-powered medical assistant that leverages **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)** to deliver accurate, context-aware responses based on trusted medical literature. The application combines semantic search with generative AI to retrieve relevant medical information before generating evidence-based answers, reducing hallucinations and improving response reliability.

---

## 🚀 Features

* 🔍 Retrieval-Augmented Generation (RAG) pipeline
* 🤖 LLM-powered medical question answering
* 📚 Semantic search over medical documents using FAISS
* 🧠 Context-aware response generation
* 💬 Interactive chatbot interface built with React
* ⚡ Fast and responsive user experience
* 🔒 Supports integration with secure Python backend (FastAPI/Flask)

  <img width="1918" height="873" alt="image" src="https://github.com/user-attachments/assets/2f0b078a-8b81-448d-a179-6e72f66df9f1" />


---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI / Flask
* LangChain

### AI & Machine Learning

* Hugging Face Transformers
* Retrieval-Augmented Generation (RAG)
* FAISS Vector Database
* Sentence Embeddings
* Large Language Models (LLMs)

---

## 📂 Project Architecture

```
Frontend (React)
        │
        ▼
REST API (FastAPI / Flask)
        │
        ▼
LangChain RetrievalQA
        │
        ▼
FAISS Vector Store
        │
        ▼
Medical Knowledge Base
        │
        ▼
Large Language Model
```

---

## ⚙️ How It Works

1. User submits a medical question through the React interface.
2. The frontend sends the query to the FastAPI/Flask backend.
3. LangChain converts the query into embeddings.
4. FAISS retrieves the most relevant medical documents.
5. The retrieved context is passed to the Large Language Model.
6. The LLM generates an accurate, context-aware response.
7. The final answer is displayed to the user along with supporting document references.

---

## 📦 Installation

Clone the repository

```bash
git clone <repository-url>
cd PharmaAI
```

Install frontend dependencies

```bash
npm install
```

Start the React application

```bash
npm run dev
```

Open your browser and visit

```
http://localhost:5173
```

---

## 🔗 Connecting the Python Backend

The frontend currently contains a mock API for demonstration purposes.

To connect the real backend:

* Locate the section labeled **TO CONNECT YOUR REAL BACKEND** inside `src/PharmaAI.jsx`.
* Replace the mock `setTimeout()` function with an HTTP `fetch()` request to your FastAPI or Flask endpoint.

Example endpoint:

```
POST /ask
```

Request

```json
{
    "query": "What are the symptoms of diabetes?"
}
```

Response

```json
{
    "result": "...",
    "source_documents": [...]
}
```

The backend uses LangChain's `RetrievalQA` pipeline to retrieve relevant medical documents from the FAISS vector database and generate evidence-based responses using a Large Language Model.

---

## 📈 Project Highlights

* Developed a Retrieval-Augmented Generation (RAG) chatbot for medical question answering.
* Integrated LangChain with FAISS for efficient semantic document retrieval.
* Leveraged Hugging Face Transformer models for contextual response generation.
* Designed a modular FastAPI backend for scalable deployment.
* Built a modern React frontend with a responsive user interface.
* Improved answer relevance by grounding responses in trusted medical literature.

---

## 🎯 Future Enhancements

* Multi-document retrieval
* Voice-based medical assistant
* Conversation memory
* Medical image analysis
* User authentication
* Cloud deployment with Docker and AWS
* Multi-language support

---

## 👨‍💻 Author

**Abhisek Chakraborty**

M.Tech (Information Security) | AI/ML Engineer | Generative AI & Agentic AI Developer

Passionate about building AI-powered applications using **Python, LLMs, LangChain, RAG, Machine Learning, and Deep Learning**.

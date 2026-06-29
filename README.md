# PharmaAI — AI Medical Assistant

Modern mid-tone React frontend for the PharmaAI medical RAG chatbot.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Connect to your Python backend

In `src/PharmaAI.jsx`, find the comment block marked:
  **TO CONNECT YOUR REAL BACKEND**

Replace the mock `setTimeout` block with a real `fetch` call to your
FastAPI or Flask server that wraps `main.py`.

Example FastAPI wrapper (`api.py`):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main import get_vectorstore, load_llm, set_custom_prompt
from langchain.chains import RetrievalQA

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Query(BaseModel):
    query: str

@app.post("/ask")
def ask(q: Query):
    TEMPLATE = """Use the context to answer. If unsure, say so.
Context: {context}
Question: {question}
Start the answer directly."""
    chain = RetrievalQA.from_chain_type(
        llm=load_llm(),
        chain_type="stuff",
        retriever=get_vectorstore().as_retriever(search_kwargs={"k": 3}),
        return_source_documents=True,
        chain_type_kwargs={"prompt": set_custom_prompt(TEMPLATE)},
    )
    response = chain.invoke({"query": q.query})
    return {
        "result": response["result"],
        "source_documents": [
            {"page_content": d.page_content, "metadata": d.metadata}
            for d in response["source_documents"]
        ],
    }
```

Run it with: `uvicorn api:app --reload`

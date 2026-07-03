# ⚛️ Hybrid RAG Assistant Pro V6.0

A production-grade AI Data Assistant with a unique **Dual-Engine** architecture that allows you to seamlessly switch between local privacy and cloud-based reasoning.

![Assistant Pulse](https://img.icons8.com/bubbles/150/artificial-intelligence.png)

## 🌟 Key Features

### 1. 🛡️ Dual-Engine Intelligence

- **Local Power**: Completely private, offline inference using `Ollama (Qwen3.5:9B)`.
- **Cloud Strength**: Low-latency, high-performance reasoning via `Google Gemini 3.1 Flash`.
- **Ensemble Mode**: Synthesize answers by querying both engines simultaneously for maximum accuracy.

### 2. 📚 Unified Knowledge RAG

- **Multi-File Processing**: Upload PDF, TXT, and CSV files simultaneously and query across all datasets.
- **URL Scrape-to-RAG**: Ingest web URLs directly to ground the AI in real-time online content.
- **FAISS Vector indexing**: Fast, in-memory similarity search for high-precision context retrieval.

### 3. 📊 Agentic Data Insight

- **Auto-Visualization**: Automatically generate interactive Plotly charts (Bar, Box, Scatter) by asking data questions.
- **Pandas Agent**: Perform complex calculations and analysis on datasets locally using an AI-driven agent.

### 4. 🕵️ Research & Observability

- **Context Inspector**: View raw similarity scores and retrieved chunks to verify the AI's logic.
- **Telemetry**: Real-time tracking of inference latency, token usage, and engine status.
- **Persistent History**: Full SQLite-based session management—rename, delete, and browse past chats.

### 5. 🔊 Interactive Multimodal UX

- **Text-to-Speech (TTS)**: Listen to AI responses with high-fidelity audio.
- **Voice-to-Prompt**: Hands-free operation using microphone recording.
- **Expert Prompt Library**: One-click professional prompt templates for analysts and developers.

## 🚀 Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/Hybrid-RAG-AI-Assistant.git
   cd Hybrid-RAG-AI-Assistant
   ```

2. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Engines**:

   - **Ollama**: Install [Ollama](https://ollama.com/) and run `ollama pull qwen3.5:9B`.
   - **Gemini**: Obtain a [Google AI Key](https://aistudio.google.com/app/apikey).

4. **Launch the Dashboard**:

   ```bash
   streamlit run app.py
   ```

## 🏗️ Architecture

- **Framework**: Streamlit
- **Orchestration**: LangChain (Core, Community, Classic)
- **Embeddings**: HuggingFace `all-MiniLM-L6-v2`
- **Vector Storage**: FAISS (Facebook AI Similarity Search)
- **Database**: SQLite3
- **Visualization**: Plotly Express

---

*Created by [Antigravity](https://google.com) - Advanced Agentic Coding Assistant.*

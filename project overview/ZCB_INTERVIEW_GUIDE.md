# Zenturio Chatbot — Complete Project Documentation 🤖

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Purpose & Why It's Needed](#purpose--why-its-needed)
3. [Tech Stack](#tech-stack)
4. [Key Features](#key-features)
5. [Architecture & How It Works](#architecture--how-it-works)
6. [Development Process](#development-process)
7. [Technical Challenges & Solutions](#technical-challenges--solutions)
8. [What Needs to Improve](#what-needs-to-improve)
9. [How It Stands Out](#how-it-stands-out)
10. [Live Demo](#live-demo)

---

## Project Overview

**Zenturio Chatbot** is a production-grade, context-aware AI assistant built as a submission for the **ZenturioTech AI Intern Assignment**. It's a modern, full-featured conversational AI application that intelligently manages conversation context, optimizes token usage, and provides a polished user experience with persistent chat history.

**Repository**: [safwanmshereef/ZenturioChatbot](https://github.com/safwanmshereef/ZenturioChatbot)

---

## Purpose & Why It's Needed

### The Problem It Solves

1. **Context Management in Chatbots**: Most basic chatbots struggle with maintaining long-form conversations. They lose context over multiple turns or get confused by pronouns and references.

2. **Token Optimization**: LLM APIs have finite context windows and token limits. Without intelligent truncation, conversations crash or become expensive.

3. **Anti-Hallucination**: Generic AI assistants frequently hallucinate information. Users need trustworthy assistants that admit uncertainty rather than fabricate answers.

4. **User Experience**: A truly professional chatbot needs persistence (chat history), multi-session management, and real-time feedback on system behavior.

### Why It Stands Out

This project goes beyond a basic chatbot by implementing **production-level features** that you'd find in commercial AI products:
- Intelligent conversation history management
- Sliding-window token optimization (not just simple truncation)
- Advanced system prompting for reliability
- Multi-session chat management with persistent storage
- Real-time analytics and token tracking
- Beautiful, modern UI with glassmorphism design

---

## Tech Stack

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend Framework** | Streamlit | Rapid Python web UI development with built-in chat components |
| **LLM Engine** | Google Generative AI (Native SDK) | Access to Gemini models with streaming support |
| **Tokenization** | Tiktoken | Accurate BPE token counting (matches OpenAI's tokenizer) |
| **Database** | SQLite3 | Lightweight, serverless chat history persistence |
| **Environment Management** | Python-dotenv | Secure API key management |
| **Language** | Python 3.8+ | Unified language for backend logic and UI |

### Why These Choices?

- **Streamlit**: Reduces development time by 10x compared to traditional web frameworks. Built-in session state management is perfect for chatbot UIs.
- **Google Gemini API**: Latest, most capable open-source-aligned models with competitive pricing.
- **Tiktoken**: Ensures accurate token counting. Using incorrect tokenizers leads to context window overflow bugs.
- **SQLite**: No external database infrastructure needed. Works perfectly for small-to-medium deployments.

### Dependencies
```
streamlit>=1.30.0
google-generativeai>=0.5.0
tiktoken>=0.5.0
python-dotenv>=1.0.0
```

---

## Key Features

### 1. **Context-Aware Responses** 🧠
- Maintains the **full conversation history** across all turns
- Intelligently resolves pronouns (e.g., "its", "that", "they") by referring back to the conversation
- Example: 
  - User: "Tell me about Python"
  - Chatbot: "Python is a versatile programming language..."
  - User: "What are its advantages?"
  - Chatbot: Correctly understands "its" refers to Python, not the last topic

### 2. **Sliding-Window Token Optimizer** ⚙️
- Tracks tokens in real-time using `tiktoken`
- When the context window approaches the limit (3,500 tokens), it **intelligently truncates**
- **Strategy**: 
  - Always preserves the system prompt (foundational rules)
  - Keeps the most recent user message (current intent)
  - Removes the oldest messages first
  - If significant truncation occurs, injects a `[Earlier conversation truncated]` notice
- **Prevents**: Context window overflow, expensive API calls, memory crashes

### 3. **Anti-Hallucination & Zero-Repetition** 🛡️
- **400+ token system prompt** explicitly enforces:
  - Extreme honesty about uncertainty
  - Prohibition on repeating previous answers
  - Instructions to ask for clarification on vague queries
- Example:
  - Chatbot never says: "I think the capital of France might be Paris"
  - Chatbot says: "I'm confident the capital of France is Paris"
  - Chatbot never repeats the same explanation twice in one conversation

### 4. **Auto Model Detection Engine** ⚡
- Scans API key permissions and **automatically selects the best available model**
- Priority order: Gemini 3.1 Pro → 3.1 Flash → 3.0 Pro → ... → 1.5 Flash
- Falls back gracefully if preferred models aren't available
- Eliminates hardcoding and ensures users always get the latest capabilities

### 5. **Real-Time Analytics Dashboard** 📊
- **Live sidebar statistics**:
  - Total messages in current session
  - API calls made
  - Current context tokens used
  - Context window utilization percentage (visual progress bar)
- **Purpose**: Users understand exactly what's happening under the hood
- **Transparency**: Builds trust and helps optimize prompts

### 6. **Data Persistence & Multi-Chat Management** 💾
- **SQLite database** (`chat_history.db`) stores all conversations permanently
- **Features**:
  - Create new chat sessions instantly
  - Switch between multiple chats
  - Rename chats for organization
  - Delete chats (with cascade delete via foreign keys)
  - Auto-load chat history on refresh (no data loss)
- **Data Model**:
  ```sql
  chat_sessions (session_id, name, created_at)
  chat_messages (id, session_id, role, content)
  ```

### 7. **Streaming Responses** 🔄
- Real-time response streaming (like ChatGPT)
- Visual "Thinking..." spinner during API calls
- Graceful error handling for content filtering

### 8. **Beautiful, Modern UI** 🎨
- **Glassmorphism design** with gradient overlays
- Dark theme optimized for eye comfort
- Responsive layout (desktop, tablet)
- Custom CSS with animations and hover effects

---

## Architecture & How It Works

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Streamlit Frontend                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Chat Display | User Input | Analytics Sidebar         │  │
│  │ (Modern UI, Real-time Updates)                        │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Core Application Logic (app.py)              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 1. API Key Management                                 │  │
│  │ 2. Model Auto-Detection                               │  │
│  │ 3. Token Counting & Optimization                      │  │
│  │ 4. Message Processing & Streaming                     │  │
│  │ 5. Session Management                                 │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
          ▼                          ▼                    ▼
    ┌─────────┐              ┌──────────────┐    ┌─────────────┐
    │ Tiktoken│              │   Gemini API │    │   SQLite3   │
    │(Tokens) │              │  (LLM Calls) │    │ (Persistence)
    └─────────┘              └──────────────┘    └─────────────┘
```

### Data Flow: When a User Sends a Message

```
1. User Types Message
   ▼
2. Message Displayed Immediately (Chat Message Component)
   ▼
3. Message Saved to SQLite Database
   ▼
4. Full Conversation (from DB) Loaded into Memory
   ▼
5. Token Count Calculated
   ├─ If exceeds MAX_INPUT_TOKENS (2700):
   │  └─ Oldest messages removed (System Prompt always kept)
   ├─ If truncation occurs:
   │  └─ Inject "[Earlier conversation truncated]" note
   └─ (If within limits, proceed as-is)
   ▼
6. Optimize Messages for Gemini
   ├─ Convert roles: "assistant" → "model"
   ├─ Skip system message (passed via system_instruction)
   └─ Prepare chat history
   ▼
7. Call Gemini API with:
   ├─ Active Model (auto-detected)
   ├─ System Instruction (400+ token prompt)
   ├─ Chat History (previous turns)
   ├─ Latest User Message
   └─ Safety Settings
   ▼
8. Stream Response in Real-Time
   ├─ Handle content filtering gracefully
   ├─ Display to user
   └─ Write to screen
   ▼
9. Save Full Response to Database
   ▼
10. Update Sidebar Statistics
    ├─ Token count
    ├─ API calls
    ├─ Context window utilization
    └─ Trigger UI Refresh
```

### Key Code Components

#### 1. **Token Optimization Function**
```python
def optimize_context_window(messages: list[dict]) -> list[dict]:
    """
    Sliding-window token optimization.
    
    Strategy:
    1. Always preserve the system prompt (messages[0])
    2. Keep the most recent user message
    3. Drop oldest user/assistant pairs until within budget
    4. If heavily truncated, inject truncation notice
    """
```

#### 2. **Auto Model Detection**
```python
@st.cache_resource
def connect_to_best_model(key):
    # Priority: gemini-3.1-pro → 3.1-flash → 3.0-pro → ... → 1.5-flash
    # Tests availability and permissions
    # Falls back gracefully
```

#### 3. **Database Persistence**
```python
# SQLite schema with foreign keys
CREATE TABLE chat_sessions (
    session_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP
)

CREATE TABLE chat_messages (
    id INTEGER PRIMARY KEY,
    session_id TEXT,
    role TEXT,           # "user", "assistant", "system"
    content TEXT,
    FOREIGN KEY (session_id) REFERENCES chat_sessions
)
```

#### 4. **System Prompt (400+ Tokens)**
The system prompt enforces:
- **Context Awareness**: Resolve pronouns by referring to conversation history
- **No Repetition**: Track what's been said and provide NEW information
- **Anti-Hallucination**: Explicit instructions to admit uncertainty
- **Clarification**: Ask for clarification on vague queries

---

## Development Process

### How I Built This Project

#### Phase 1: Requirements Analysis
- Understood the assignment requirements (LLM API, chat history, context window, token optimization)
- Identified gaps between basic chatbot implementations and production requirements
- Designed the system architecture to meet/exceed all requirements

#### Phase 2: Core Implementation
1. **Set up Streamlit framework** with session state management
2. **Integrated Google Gemini API** with native Python SDK
3. **Implemented token counting** using tiktoken
4. **Built sliding-window optimization** algorithm
5. **Designed and crafted the 400+ token system prompt**
6. **Implemented SQLite database** for persistence

#### Phase 3: Advanced Features
1. **Auto model detection engine** (graceful fallback)
2. **Multi-session chat management** with rename/delete functionality
3. **Real-time analytics dashboard** with live metrics
4. **Streaming responses** with error handling
5. **Beautiful UI** with glassmorphism CSS

#### Phase 4: Testing & Refinement
- Created test files (`test_google_key.py`, `test_logic.py`) to validate:
  - API connectivity
  - Model availability
  - Token counting accuracy
  - Context window logic
- Deployed to Streamlit Community Cloud for live testing
- Iterated on UI/UX based on user feedback

#### Phase 5: Documentation & Deployment
- Comprehensive README with setup instructions
- Deployed to production on Streamlit Community Cloud
- Created this documentation for interview preparation

### Key Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| **Streamlit** (not Flask/Django) | Rapid development, built-in chat components, minimal boilerplate |
| **Tiktoken** (not simple word count) | Accurate token counting prevents context overflow bugs |
| **SQLite** (not PostgreSQL) | Lightweight, serverless, perfect for small deployments |
| **Sliding-window** (not simple truncation) | Preserves system prompt and recent context for better quality |
| **System prompt** (not default behavior) | Anti-hallucination and context awareness are critical |
| **Streaming responses** | Mimics ChatGPT UX, provides real-time feedback |
| **Multi-session management** | Professional feature that users expect from modern chat apps |

---

## Technical Challenges & Solutions

### Challenge 1: **Token Counting Accuracy** ⚠️

**Problem**: 
- Different tokenizers count tokens differently
- Using wrong tokenizer leads to context overflow bugs
- Word counting is too inaccurate for LLMs

**Solution**:
- Used `tiktoken` with `cl100k_base` encoding (same as OpenAI)
- Created `count_message_tokens()` function that:
  - Counts content tokens accurately
  - Adds 4 tokens overhead per message (role, markers)
  - Adds 2 tokens for reply priming
- **Result**: Accurate token tracking prevents API failures

---

### Challenge 2: **Pronoun Resolution** 🔤

**Problem**:
- User says: "Tell me about Python" → Chatbot explains
- User says: "What are its advantages?" → Chatbot gets confused about "its"
- Naive approaches: String matching, named entity recognition (unreliable)

**Solution**:
- **System prompt-based approach**: Explicitly instruct the model to:
  - Maintain awareness of conversation history
  - Resolve pronouns by referring back to recent topics
  - Ask for clarification if ambiguous
- **Why it works**: LLMs are naturally good at context resolution; we just need to instruct them clearly
- **Example in prompt**: "If the user uses pronouns like 'it', 'its', 'they', resolve them by referring back to the most recent relevant topic"

---

### Challenge 3: **Context Window Overflow** 💥

**Problem**:
- Conversations grow infinitely
- Context window is limited (usually 4K-100K tokens)
- Once exceeded, API calls fail or responses degrade
- Naive approach: Just delete old messages (loses conversation quality)

**Solution**: **Sliding-window optimization**
```
1. System Prompt (always preserved) ← CRITICAL
2. Most recent messages
3. Remove oldest messages first
4. Keep recent context for continuity
5. Inject truncation notice if needed
```

**Why this works**:
- System prompt contains core behavioral rules → must stay
- Recent messages are most relevant to user's current intent
- Old messages less important than context window capacity
- Truncation notice prevents confusion about what happened

---

### Challenge 4: **API Model Compatibility** 🔄

**Problem**:
- Hardcoding model names is brittle
- API changes, models deprecate, new models release
- Different users may have access to different models
- Users don't know which model they should use

**Solution**: **Auto-detection engine**
```python
Priority: gemini-3.1-pro → 3.1-flash → 3.0-pro → ... → 1.5-flash

For each candidate:
1. Check if available in list_models()
2. Test with actual API call
3. Return first successful model
4. Fall back to known-working default
```

**Benefits**:
- Always uses best available model
- No hardcoding issues
- Graceful degradation
- Users informed of their model choice

---

### Challenge 5: **Hallucination Prevention** 🚫

**Problem**:
- LLMs often fabricate information confidently
- Users trust AI and repeat false information
- No built-in mechanism to prevent this

**Solution**: **Multi-layered system prompt**
```
1. Explicit honesty rules: "If uncertain, say 'I'm not fully certain...'"
2. Verification instructions: "Prefer being honest about uncertainty"
3. No fabrication rules: "NEVER fabricate facts, statistics, URLs, dates"
4. Clarification rules: "Ask before answering ambiguous questions"
```

**Why this works**:
- LLMs follow explicit instructions well
- Clear constraints reduce hallucination
- Transparency builds user trust
- **Result**: Chatbot admits uncertainty rather than making things up

---

### Challenge 6: **No Repetition Policy** 🔁

**Problem**:
- Chatbots often repeat the same answer across multiple turns
- Users find this frustrating: "I already told you that!"
- Requires conversation tracking

**Solution**: **System prompt with tracking instructions**
```
"Track everything you have already told the user.
Do NOT repeat information unless explicitly asked.
If follow-up overlaps with previous answer,
acknowledge what was said and provide NEW information only."
```

**Why this works**:
- LLMs have context → can track what they've said
- Explicit instruction makes them conscious of repetition
- Result: Fresh answers to follow-up questions

---

### Challenge 7: **Database Persistence** 💾

**Problem**:
- Browser refresh loses conversation (bad UX)
- Need reliable persistence across sessions
- Deployed on Streamlit Cloud (read-only filesystem)

**Solution**:
- SQLite for local deployment (works perfectly)
- Error handling for deployed version (graceful degradation)
- Foreign keys with cascade delete (data integrity)
- Immediate save after each message (no data loss)

```sql
-- Schema enforces referential integrity
CREATE TABLE chat_sessions (...)
CREATE TABLE chat_messages (
    FOREIGN KEY (session_id) REFERENCES chat_sessions ON DELETE CASCADE
)
```

---

### Challenge 8: **Content Filtering Graceful Handling** 🔒

**Problem**:
- Gemini Safety API sometimes blocks innocent requests
- If not handled, app crashes with `ValueError`
- User experience suffers

**Solution**: **Robust streaming with try-catch**
```python
def stream_chunks():
    try:
        for chunk in response:
            try:
                if chunk.text:
                    yield chunk.text
            except ValueError:  # Safety filter blocked this chunk
                yield " [⚠️ Content filtered by Gemini Safety Policy] "
                break
    except Exception as e:
        yield f" [⚠️ Stream error: {str(e)}] "
```

**Benefits**:
- App never crashes
- Users informed of content filtering
- Professional error handling

---

## What Needs to Improve

### 1. **Advanced RAG (Retrieval-Augmented Generation)** 📚
**Current State**: Chatbot uses only conversation history
**Future**: Add document upload/file parsing capabilities
- Users upload PDFs, docs, web pages
- System creates embeddings (vector DB)
- Relevant context automatically injected into prompts
- Use case: "Answer based on this document"

### 2. **User Accounts & Authentication** 👤
**Current State**: Local SQLite, single-user
**Future**: 
- User registration/login (Firebase or Auth0)
- Multi-user support with per-user databases
- Chat history synced across devices
- Usage analytics per user

### 3. **Fine-Tuning & Custom Instructions** ⚙️
**Current State**: Fixed system prompt for all users
**Future**:
- Users customize system prompt
- Save custom instructions for specific use cases
- Role-based personas (e.g., "Code Assistant", "Writing Coach")
- Parameter tuning (temperature, top-p)

### 4. **Semantic Search in Chat History** 🔍
**Current State**: No way to find specific past conversations
**Future**:
- Embed chat history messages
- Semantic search: "Find where we discussed authentication"
- Smart summarization of old conversations
- Better context retrieval

### 5. **Conversation Branching** 🌳
**Current State**: Linear conversation history only
**Future**:
- Branch conversations at any point
- Explore "what-if" alternatives
- Merge branches with conflict resolution
- Visual tree of conversation paths

### 6. **Real-Time Collaboration** 👥
**Current State**: Single-user sessions
**Future**:
- Multiple users in same chat
- Real-time message streaming
- Comments and annotations
- Permission control (read-only, edit)

### 7. **Advanced Analytics** 📈
**Current State**: Simple token counting
**Future**:
- Message sentiment analysis
- Topic modeling over conversations
- Usage patterns visualization
- Cost breakdown by model/feature

### 8. **Mobile App** 📱
**Current State**: Web app only
**Future**:
- Native iOS/Android apps
- Offline message queue (sync when online)
- Voice input/output
- Push notifications

### 9. **Multi-Modal Input** 🖼️
**Current State**: Text only
**Future**:
- Image upload and analysis
- Voice transcription
- Document OCR
- Screenshot annotation

### 10. **Structured Output** 📋
**Current State**: Free-form text responses
**Future**:
- JSON/structured output mode
- API endpoint for programmatic access
- Database query generation
- Form filling assistance

---

## How It Stands Out

### Compared to Basic Chatbots ✨

| Feature | Basic Chatbot | Zenturio | Advantage |
|---------|---------------|----------|-----------|
| Context Window Handling | Naive truncation | Sliding-window optimization | Preserves conversation quality |
| Pronoun Resolution | None | Implicit via system prompt | Natural, human-like responses |
| Anti-Hallucination | None | Explicit rules in prompt | Trustworthy, honest answers |
| Multi-Session | Not supported | Full session management | Professional UX |
| Token Tracking | None | Real-time analytics | Transparency, debugging |
| Repetition Prevention | None | Tracked in prompt | Fresh, engaging responses |
| Auto Model Detection | Hardcoded | Intelligent fallback | Always uses best model |
| Production Readiness | Demo only | Full persistence, error handling | Deployable to production |

### Compared to ChatGPT 🚀

| Feature | ChatGPT | Zenturio | Zenturio's Edge |
|---------|---------|---------|-----------------|
| UI Framework | Custom | Streamlit | Faster iteration, open-source |
| Token Optimization | Opaque | Transparent | Users understand system |
| Model Selection | Fixed | Auto-detection | Flexibility, future-proof |
| Local Deployment | Not available | Trivial | Privacy, offline capability |
| Customization | Limited | Full control | Adapt to specific use cases |
| Cost | $ per use | Free (local) or cheap (cloud) | Cost-effective at scale |

### Production-Ready Features 🏆

1. **Error Handling**: Graceful degradation, no crashes
2. **Persistence**: Data survives browser refresh
3. **Analytics**: Real-time metrics for debugging
4. **Transparency**: Users see exactly what's happening
5. **Scalability**: SQLite works for hundreds of sessions
6. **Security**: API key never exposed in code
7. **Accessibility**: Dark theme, responsive design
8. **Testing**: Comprehensive test files included

### Code Quality 💎

- **Well-structured**: Clear separation of concerns
- **Documented**: Comments explain complex logic
- **Type hints**: Optional but supported
- **Error handling**: Try-catch blocks prevent crashes
- **Performance**: Caching with `@st.cache_resource`
- **Best practices**: Following Streamlit/Python conventions

---

## Live Demo

🚀 **Try it live**: [ZenturioTech Chatbot](https://zenturiotechchatbot.streamlit.app)

### Local Setup

```bash
# Clone repository
git clone https://github.com/safwanmshereef/ZenturioChatbot.git
cd ZenturioChatbot

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# Run locally
python -m streamlit run app.py
```

The app will open at `http://localhost:8501`

---

## Interview Talking Points

### Opening Statement
"I built Zenturio Chatbot as a solution to a real problem: how do you create a production-grade AI chatbot that intelligently manages context, tracks tokens, prevents hallucinations, and provides a professional user experience? I implemented context-aware responses with pronouns resolution, sliding-window token optimization to prevent overflow, a 400+ token system prompt to prevent hallucinations, and multi-session chat management with SQLite persistence."

### Technical Depth
"The most interesting challenge was the sliding-window token optimization. Naive truncation just deletes old messages, but that degrades conversation quality. Instead, I preserve the system prompt (foundational rules), keep the most recent user message (current intent), and remove oldest messages first. If significant truncation occurs, I inject a notice. This maintains quality while respecting token limits."

### System Design
"The architecture separates concerns: Streamlit handles the UI, the core logic manages sessions and tokenization, Tiktoken ensures accurate token counting, and SQLite provides persistence. This makes the system modular and testable."

### Future Vision
"While this is a solid foundation, the next steps would be multi-user support with user accounts, semantic search over chat history, RAG capabilities for document understanding, and mobile app deployment. These would make it competitive with commercial chatbots."

---

## Key Takeaways

✅ **Solves real problems**: Context management, token optimization, hallucination prevention  
✅ **Production-ready**: Persistence, error handling, analytics, transparency  
✅ **Well-architected**: Modular, testable, scalable  
✅ **User-focused**: Beautiful UI, real-time feedback, intuitive experience  
✅ **Future-proof**: Extensible design, clear improvement path  
✅ **Thoroughly documented**: README, code comments, this guide  

---

*Last Updated: May 26, 2026*  
*Built by: Safwan M Shereef for ZenturioTech*

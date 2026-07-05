const fs = require('fs');
const filePath = 'components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Update project descriptions, deliverables, and architecture details based on READMEs
const newProjects = `const projects: Project[] = [
  {
    id: "rag",
    title: "Hybrid-RAG-AI-Assistant",
    stack: "Python • FAISS • LangChain • Streamlit • Gemini 3.1",
    description: "A production-grade AI Data Assistant featuring a unique Dual-Engine architecture. Seamlessly switch between local privacy (Ollama Qwen3.5) and cloud-based reasoning (Gemini 3.1 Flash) for maximum data security and low-latency processing.",
    githubUrl: "https://github.com/safwanmshereef/Hybrid-RAG-AI-Assistant",
    deliverables: [
      "🛡️ Dual-Engine Intelligence: Local offline inference via Ollama + Cloud API via Gemini.",
      "📚 Unified Knowledge RAG: Process multi-file PDFs, TXTs, CSVs and URL Scrape-to-RAG via FAISS.",
      "📊 Agentic Data Insight: Auto-generates interactive Plotly charts and handles Pandas calculations.",
      "🔊 Multimodal UX: Interactive Text-to-Speech (TTS) and Voice-to-Prompt capabilities."
    ],
    architectureDetails: [
      "Engineered a robust Multi-File processing pipeline utilizing LangChain, FAISS Vector Indexing, and HuggingFace all-MiniLM-L6-v2 embeddings.",
      "Implemented a 'Context Inspector' allowing users to view raw similarity scores and retrieved chunks, bringing observability to AI reasoning."
    ],
    topologyJson: \`// Pipeline_Topology.json

[User Input]
   |
   v
[API Gateway] -> (Auth)
   |
   v
[Logic Core] <-> [Database]
   |
   v
[Output Renderer]
   |
   v
[Client Sync]\`
  },
  {
    id: "finance",
    title: "Finance-Dashboard",
    stack: "FastAPI • Streamlit • SQLAlchemy • Postgres/SQLite",
    description: "Full-stack decoupled finance platform featuring robust role-based access control, dynamic filtering, budget tracking, and real-time dashboard analytics.",
    githubUrl: "https://github.com/safwanmshereef/Finance-Dashboard",
    demoUrl: "https://finance-dashboard-zorvyn.streamlit.app/",
    deliverables: [
      "User management with roles (viewer, analyst, admin) and status tracking.",
      "Role-based access control across robust API endpoints.",
      "Financial records CRUD with comprehensive validation and filtering.",
      "Dashboard summary APIs for aggregates and dynamic trend analysis."
    ],
    architectureDetails: [
      "Implemented Date-range analytics controls on dashboard summary and trends.",
      "Built a Monthly budget tracker in the sidebar with an active utilization indicator.",
      "Developed a search-enabled records explorer across category and notes.",
      "Added one-click CSV export functionality for the filtered records."
    ],
    topologyJson: \`// Pipeline_Topology.json
[User Input]
   |
   v
[API Gateway] -> (Auth)
   |
   v
[Logic Core] <-> [Database]
   |
   v
[Output Renderer]
   |
   v
[Client Sync]\`
  },
  {
    id: "release_app",
    title: "ProductionReleaseApp",
    stack: "Python • Streamlit • SQLite • Gemini AI",
    description: "An Enterprise Ops Hub for monitoring pipelines and managing incidents. Includes real-time job tracking and AI-powered smart ticketing triage.",
    githubUrl: "https://github.com/safwanmshereef/ProductionReleaseApp",
    deliverables: [
      "Real-time Deployment Job Tracking with duration and status analytics.",
      "AI-Powered Smart Ticketing Triage utilizing Google Gemini.",
      "Context-Aware Knowledge Assistant trained on Ops Docs.",
      "Dynamic Status Dashboard mapping deployment metrics and incidents."
    ],
    architectureDetails: [
      "Streamlit application acting as centralized Ops Hub.",
      "SQLite DB managing continuous log streaming state.",
      "Native Gemini SDK integrated for auto-resolution generation.",
      "Automated categorization of severity and impact levels."
    ],
    topologyJson: \`// Pipeline_Topology.json
{
  "Ops_Triggers": ["Deploy_Events", "Incident_Logs"],
  "State_Manager": "SQLite",
  "AI_Triage": "Google Gemini",
  "Hub_Dashboard": {
    "Metrics": "Live Status",
    "Tickets": "Smart Prioritization"
  }
}\`
  },
  {
    id: "zenturio",
    title: "ZenturioChatbot",
    stack: "Python • Streamlit • Gemini SDK",
    description: "Production-grade, context-aware AI assistant built with Google's native Gemini SDK featuring sliding-window token optimization.",
    githubUrl: "https://github.com/safwanmshereef/ZenturioChatbot",
    demoUrl: "https://zenturiotechchatbot.streamlit.app",
    deliverables: [
      "Context-Aware Responses maintaining full conversation history.",
      "Sliding-Window Token Optimizer to accurately track BPE tokens.",
      "Anti-Hallucination & Zero-Repetition system prompt.",
      "Auto Model Detection Engine prioritizing newest capable models."
    ],
    architectureDetails: [
      "Data Persistence & Multi-Chat Management using SQLite database.",
      "Real-Time Analytics Dashboard tracking session tokens and API calls.",
      "Tokenization handled efficiently by Tiktoken (cl100k_base).",
      "Dynamic context management gracefully truncating older messages."
    ]
  },
  {
    id: "sra",
    title: "SRA Groups System",
    stack: "FastAPI • React (Vite) • React Native (Expo) • Firebase",
    description: "A comprehensive, full-stack management system designed to track employee attendance with GPS geofencing, manage real estate projects, and handle CRM/finance workflows.",
    githubUrl: "https://github.com/safwanmshereef/real-estate-dashboard",
    deliverables: [
      "GPS Geofencing to validate worker location for self-check-ins.",
      "Role-Based Access with specialized dashboards for workers and admins.",
      "Live attendance monitoring with verification photo capture.",
      "CRM & Finance management for brokers, clients, deals, and wage payments."
    ],
    architectureDetails: [
      "Backend: FastAPI server providing endpoints for authentication, attendance, site management.",
      "Admin Dashboard: React (Vite) web application for supervisors and reporting.",
      "Mobile App: React Native (Expo) for worker self-service and QR scanning.",
      "Secure Audit Trail logging every significant action for security."
    ]
  },
  {
    id: "cfta",
    title: "CFTA CO2 Analytics",
    stack: "Java • PHP • JS • Python • Jupyter",
    description: "A comprehensive project focused on tracking, managing, and analyzing CO2 emissions across mobile applications, web interfaces, and Jupyter Notebook data pipelines.",
    githubUrl: "https://github.com/safwanmshereef/CFTA",
    deliverables: [
      "Mobile App (Java) for real-time tracking and inputting of CO2 emission data.",
      "Web Dashboard (PHP/Blade/JS) for comprehensive data visualization and management.",
      "Data Analysis pipelines (Python/Jupyter) for exploring and identifying emission trends.",
      "Integrated system architecture bridging data collection and advanced analytics."
    ],
    architectureDetails: [
      "Mobile client built natively in Android Studio for on-the-go data capture.",
      "Web server backend processing and serving visualizations of the aggregated data.",
      "Jupyter Notebooks utilized for deeper statistical analysis of datasets.",
      "Centralized tracking designed to facilitate better environmental monitoring."
    ]
  }
];`;

content = content.replace(/const projects: Project\[\] = \[[\s\S]*?\];/m, newProjects);

// Add architectural graph to Modal Component
// Replace `<p className="text-white mb-6 leading-relaxed text-sm md:text-base border-l-2 border-[#ef4444] pl-4">{selectedProject.description}</p>`
const descriptionBlock = `<p className="text-white mb-6 leading-relaxed text-sm md:text-base border-l-2 border-[#ef4444] pl-4">{selectedProject.description}</p>`;
const descriptionWithImage = `<p className="text-white mb-6 leading-relaxed text-sm md:text-base border-l-2 border-[#ef4444] pl-4">{selectedProject.description}</p>
                        <div className="mb-6 w-full rounded-lg overflow-hidden border border-[#1a1d24]">
                          <img src="/assets/architectural_graph.png" alt="Architectural Graph" className="w-full object-cover max-h-[300px]" />
                        </div>`;

content = content.replace(descriptionBlock, descriptionWithImage);

// Replace "Live Demo" button text
content = content.replace(/>Live Demo</g, '>Live Demo Link<');

fs.writeFileSync(filePath, content);
console.log("Updated Projects.tsx");

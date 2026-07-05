"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, X, ExternalLink, PlaySquare } from "lucide-react";

type Project = {
  id: string;
  title: string;
  stack: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  iframeSupport?: boolean;
  deliverables: string[];
  architectureDetails: string[];
  topologyJson?: string;
};

const projects: Project[] = [
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
      "Local Inference Layer: Offline Qwen3.5 model execution.",
      "Cloud Intelligence Layer: Gemini 3.1 API for complex reasoning.",
      "Vector Storage: Local FAISS indexing for rapid document retrieval.",
      "UI Layer: Streamlit providing interactive chat and multimodal inputs."
    ],
    topologyJson: `
[Streamlit UI] <-> [LangChain Orchestrator]
       |                      |
[FAISS Store]         (Dual Engine Router)
       v                      v
(Local Documents)      +---------------+---------------+
                       | Local Ollama  | Cloud Gemini  |
                       +---------------|---------------+`
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
      "API Layer: FastAPI routing and dependency injection.",
      "Data Access Layer: SQLAlchemy ORM interacting with DB.",
      "Frontend Layer: Streamlit consuming REST APIs asynchronously."
    ],
    topologyJson: `
[Streamlit Frontend] -> (REST API Calls)
                              |
                       [FastAPI Backend]
                              |
                       (SQLAlchemy ORM)
                              |
                    [Postgres/SQLite DB]`
  },
  {
    id: "ops",
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
      "Core Logic: Python backend handling state and API interactions.",
      "AI Integration: Gemini API for contextual triage.",
      "Persistence: SQLite managing job states and historical data."
    ],
    topologyJson: `
[Ops Dashboard] <-> [Python Core Engine]
                           |
            +--------------+--------------+
            |                             |
      [Gemini API]                  [SQLite DB]
      (AI Triage)                   (Job States)`
  },
  {
    id: "chat",
    title: "ZenturioChatbot",
    stack: "Python • Streamlit • Gemini SDK",
    description: "Production-grade, context-aware AI assistant built with Google's native Gemini SDK featuring sliding-window token optimization.",
    githubUrl: "https://github.com/safwanmshereef/ZenturioChatbot",
    demoUrl: "https://zenturiotechchatbot.streamlit.app",
    iframeSupport: true,
    deliverables: [
      "Context-Aware multi-turn conversation memory.",
      "Sliding-Window Token Optimizer utilizing tiktoken.",
      "Strict Anti-Hallucination rules via system prompts.",
      "Auto Model Detection Engine connecting to highest capable model available."
    ],
    architectureDetails: [
      "Memory Manager: Sliding-window token tracking.",
      "API Client: Official Google Gemini SDK integration.",
      "UI Handler: Streamlit state management."
    ],
    topologyJson: `
[User Input] -> [Streamlit UI]
                     |
            [Memory Manager] (Truncates History)
                     |
            [Gemini SDK Client] -> [Google Cloud AI]`
  },
  {
    id: "nutri",
    title: "NutriScan AI",
    stack: "Python • Streamlit • Google Gemini Vision",
    description: "Smart health companion. Uses Gemini Vision Pro to scan food photos, instantly detect calories, and act as an AI chef.",
    githubUrl: "https://github.com/safwanmshereef/nutriscan-ai",
    deliverables: [
      "Instant Calorie & Macro Detection from food images.",
      "Dynamic AI Chef generating custom diet-aware recipes.",
      "Health Risk Highlighting for scanned ingredients.",
      "Personalized intake tracking based on dietary goals."
    ],
    architectureDetails: [
      "Image Processor: Prepares uploads for API consumption.",
      "Vision AI: Gemini Vision Pro endpoint for multimodal analysis.",
      "UI Layer: Streamlit providing instant visual feedback."
    ],
    topologyJson: `
[Image Upload] -> [Streamlit UI]
                       |
             [Image Preprocessor]
                       |
             [Gemini Vision Pro]
                       |
             (JSON Output Parsing) -> [UI Display]`
  },
  {
    id: "sra",
    title: "SRA Groups System",
    stack: "FastAPI • React (Vite) • React Native (Expo) • Firebase",
    description: "A comprehensive, full-stack management system designed to track employee attendance with GPS geofencing, manage real estate projects, and handle CRM/finance workflows.",
    githubUrl: "https://github.com/safwanmshereef/SRA-Groups",
    deliverables: [
      "GPS Geofencing to validate worker location for self-check-ins.",
      "Role-Based Access with specialized dashboards for workers and admins.",
      "Live attendance monitoring with verification photo capture.",
      "CRM & Finance management for brokers, clients, deals, and wage payments."
    ],
    architectureDetails: [
      "Mobile Client: React Native/Expo app for workers.",
      "Web Client: React/Vite dashboard for admins.",
      "Backend API: FastAPI handling business logic and auth.",
      "Database: Firebase / Postgres for scalable storage."
    ],
    topologyJson: `
[Mobile App]          [Web Dashboard]
      \                    /
       (REST API / WebSocket)
                 |
          [FastAPI Server]
                 |
           [Database Layer]`
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
      "Mobile Data Entry: Java Android App.",
      "Central API & Web: PHP backend and JS frontend.",
      "Analytics Engine: Python / Jupyter Notebooks processing DB dumps."
    ],
    topologyJson: `
[Android App] -> (API) -> [PHP Web Server]
                                |
                          [SQL Database]
                                |
                        (Data Export CSV)
                                v
                     [Jupyter Data Pipeline]`
  },
  {
    id: "fruit",
    title: "Fruit Veggie Identifier",
    stack: "Python • OpenCV • TensorFlow",
    description: "Computer Vision web application leveraging a trained TensorFlow model to identify produce via webcam and estimate calories.",
    githubUrl: "https://github.com/safwanmshereef/FRUIT_VEGGIE_IDENTIFIER_BASICINFO_AND_CALORIE_ESTIMATOR",
    deliverables: [
      "Real-time classification using a trained TensorFlow model.",
      "Webcam integration via OpenCV mapping live feeds.",
      "Instant generation of basic nutritional info based on class.",
      "Streamlit UI providing immediate visual feedback."
    ],
    architectureDetails: [
      "Video Capture: OpenCV mapping local webcam streams.",
      "Inference Engine: TensorFlow model executing classifications.",
      "UI State: Streamlit updating classifications per frame."
    ],
    topologyJson: `
[Webcam Stream] -> [OpenCV Frame Capture]
                            |
                 [TensorFlow Inference Engine]
                            |
                     (Class String ID)
                            v
                    [Streamlit Web UI]`
  },
  {
    id: "store",
    title: "Store Management System",
    stack: "Next.js • FastAPI • PostgreSQL",
    description: "Role-based operations platform developed during internship. Orchestrates daily stock verification and Zoho/GoFrugal integrations.",
    githubUrl: "https://github.com/safwanmshereef/store-application",
    deliverables: [
      "Role-based OTP authentication for Admin/Manager flows.",
      "Daily stock verification logic with mismatch flagging.",
      "Integration layer synchronizing Zoho and GoFrugal data.",
      "Modern Next.js 14 App Router frontend implementation."
    ],
    architectureDetails: [
      "Frontend: Next.js App Router for dynamic rendering.",
      "Backend: FastAPI serving secure endpoints.",
      "Database: PostgreSQL handling relational stock data."
    ],
    topologyJson: `
[Next.js App] <-> (FastAPI Secure Endpoints)
                             |
                     [PostgreSQL DB]
                             |
              (Data Sync Background Workers)
              /                            \
        [Zoho API]                  [GoFrugal API]`
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === selectedId);

  return (
    <section className="py-24 px-8 lg:px-24 relative border-t-2 border-slate/50">
      <div className="mb-16">
        <h2 className="text-4xl font-display font-bold uppercase tracking-widest flex items-center space-x-4">
          <FolderGit2 className="text-sunset-orange" />
          <span>The Quest Board</span>
        </h2>
        <p className="font-mono text-cream/50 mt-2">Active bounties and deployed infrastructure. Click to expand logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.id}`}
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="manga-panel p-6 cursor-pointer interactive group hover:border-sunset-orange/50 transition-colors flex flex-col h-full"
          >
            <motion.div layoutId={`title-${project.id}`} className="font-display font-bold text-xl mb-2 group-hover:text-sunset-orange transition-colors">
              {project.title}
            </motion.div>
            <motion.div layoutId={`stack-${project.id}`} className="font-mono text-xs text-neon-teal mb-4">
              {project.stack}
            </motion.div>
            <motion.div layoutId={`desc-${project.id}`} className="text-cream/70 text-sm line-clamp-3 mb-6 flex-grow">
              {project.description}
            </motion.div>

            <div className="mt-auto pt-4 border-t border-slate/50 flex items-center justify-between text-xs font-mono uppercase text-cream/40">
              <span>View Data Logs</span>
              {project.iframeSupport && <span className="text-radiant-gold flex items-center"><PlaySquare size={14} className="mr-1"/> Live Demo</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${activeProject.id}`}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col bg-[#0f1115] border border-[#1e293b] rounded-lg shadow-2xl custom-scrollbar"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-start p-6 border-b border-[#1e293b]">
                 <div>
                    <motion.div layoutId={`title-${activeProject.id}`} className="font-sans font-bold text-3xl text-[#ef4444] mb-2 pr-8">
                      {activeProject.title}
                    </motion.div>
                    <motion.div layoutId={`stack-${activeProject.id}`} className="font-mono text-sm text-[#06b6d4] space-x-2 flex flex-wrap">
                      {activeProject.stack.split(" • ").map((tech, i) => (<span key={i} className="flex items-center">{i > 0 && <span className="text-gray-600 mx-2">•</span>}{tech}</span>))}
                    </motion.div>
                 </div>
                 <button
                   onClick={() => setSelectedId(null)}
                   className="text-gray-500 hover:text-white transition-colors"
                 >
                   <X size={24} />
                 </button>
              </div>

              {/* Main Content Area - Split Layout */}
              <div className="flex flex-col lg:flex-row p-6 gap-8 overflow-y-auto">
                 {/* Left Column - Details */}
                 <div className="flex-1 space-y-6">
                    <motion.div layoutId={`desc-${activeProject.id}`} className="text-gray-300 text-base leading-relaxed pb-6 border-b border-[#1e293b]">
                      {activeProject.description}
                    </motion.div>

                    <div>
                        <h4 className="text-[#ef4444] font-sans text-sm uppercase font-bold tracking-wider mb-4 mt-6">CORE DELIVERABLES</h4>
                        <ul className="space-y-2">
                           {activeProject.deliverables.map((item, i) => (
                             <li key={i} className="text-sm text-gray-300 flex items-start">
                               <span className="text-[#10b981] font-mono mr-2 mt-0.5">&gt;</span>
                               {item}
                             </li>
                           ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sunset-orange font-mono text-sm uppercase font-bold tracking-wider mb-3 mt-6">System Architecture Details</h4>
                        <ul className="space-y-2">
                           {activeProject.architectureDetails.map((item, i) => (
                             <li key={i} className="text-sm text-gray-300 flex items-start">
                               <span className="text-[#eab308] font-mono mr-2 mt-0.5">*</span>
                               {item}
                             </li>
                           ))}
                        </ul>
                    </div>
                 </div>

                 {/* Right Column - Topology & Actions */}
                 <div className="flex-1 flex flex-col space-y-6">
                    {/* Code Block Container */}
                    <div className="bg-[#0d1117] border border-[#1e293b] rounded-md p-5 relative group">
                        <div className="absolute top-2 right-2 flex space-x-1">
                           <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <pre className="font-mono text-xs whitespace-pre-wrap pt-4 overflow-x-auto text-[#e2e8f0]">

                           {activeProject.topologyJson ? (
                             activeProject.topologyJson.split('\n').map((line, i) => {
                               if (line.startsWith('//')) return <span key={i} className="text-gray-500">{line}\n</span>;
                               if (line.includes('[')) {
                                  const parts = line.split(/(\[.*?\])/g);
                                  return (
                                    <span key={i}>
                                      {parts.map((part, j) =>
                                        part.startsWith('[') ? <span key={j} className="text-[#eab308]">{part}</span> : <span key={j}>{part}</span>
                                      )}
                                      \n
                                    </span>
                                  )
                               }
                               if (line.includes('(')) {
                                  const parts = line.split(/(\(.*?\))/g);
                                  return (
                                    <span key={i}>
                                      {parts.map((part, j) =>
                                        part.startsWith('(') ? <span key={j} className="text-[#f97316]">{part}</span> : <span key={j}>{part}</span>
                                      )}
                                      \n
                                    </span>
                                  )
                               }
                               if (line.includes('|') || line.includes('v') || line.includes('->') || line.includes('<->')) {
                                  return <span key={i} className="text-[#10b981]">{line}\n</span>;
                               }
                               return <span key={i}>{line}\n</span>;
                             })
                           ) : "// Topology mapping unavailable."}

                        </pre>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-4 mt-auto">
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 border border-[#1e293b] text-gray-300 hover:text-white hover:bg-[#1e293b]/50 rounded flex justify-center items-center space-x-2 font-mono text-sm uppercase transition-colors"
                        >
                          <FolderGit2 size={16} />
                          <span>Repository Origin</span>
                        </a>

                        {activeProject.demoUrl && !activeProject.iframeSupport && (
                           <a
                             href={activeProject.demoUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="w-full py-3 border border-[#1e293b] text-gray-300 hover:text-white hover:bg-[#1e293b]/50 rounded flex justify-center items-center space-x-2 font-mono text-sm uppercase transition-colors mt-4"
                           >
                             <ExternalLink size={16} />
                             <span>External Uplink</span>
                           </a>
                        )}
                    </div>
                 </div>
              </div>

              {/* Iframe Support (If applicable) */}
              {activeProject.iframeSupport && activeProject.demoUrl && (
                <div className="w-full h-[500px] border-t border-slate relative group overflow-hidden shrink-0 mt-4">
                   <div className="absolute top-0 left-0 w-full p-2 bg-[#0d1117] font-mono text-[10px] uppercase text-cream/50 flex justify-between z-10 pointer-events-none border-b border-slate/30">
                      <span>Streamlit Sandbox Uplink</span>
                      <span className="text-neon-teal blink">Online</span>
                   </div>
                   <iframe
                     src={activeProject.demoUrl}
                     title={`${activeProject.title} Demo`}
                     className="w-full h-full border-none pt-8 bg-[#0d1117]"
                     sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                   />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

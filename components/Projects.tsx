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
      "Engineered a robust Multi-File processing pipeline utilizing LangChain, FAISS Vector Indexing, and HuggingFace all-MiniLM-L6-v2 embeddings.",
      "Implemented a \'Context Inspector\' allowing users to view raw similarity scores and retrieved chunks, bringing observability to AI reasoning."
    ],
    topologyJson: `// Pipeline_Topology.json

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
[Client Sync]`
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
    topologyJson: `// Pipeline_Topology.json
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
[Client Sync]`
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
    topologyJson: `// Pipeline_Topology.json
{
  "Ops_Triggers": ["Deploy_Events", "Incident_Logs"],
  "State_Manager": "SQLite",
  "AI_Triage": "Google Gemini",
  "Hub_Dashboard": {
    "Metrics": "Live Status",
    "Tickets": "Smart Prioritization"
  }
}`
  },
  {
    id: "zenturio",
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
      "State-persisted multi-chat management with SQLite3.",
      "Real-Time Analytics Dashboard for token and API call tracking.",
      "Dynamic prompt engineering preserving system directives on context overflow.",
      "Glassmorphism UI styling built natively in Streamlit."
    ],
    topologyJson: `// Pipeline_Topology.json
[User Message]
   |
[Token Analyzer] -> (Truncate if overflow)
   |
[System Prompt Context]
   |
[Gemini LLM Engine] <-> [SQLite DB]
   |
[Streamlit Render]`
  },
  {
    id: "nutriscan",
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
      "Gemini Vision API mapping image features to nutritional matrices.",
      "Streamlit based UI for cross-platform accessibility.",
      "Integration of real-time prompt structuring for dietary constraints.",
      "Interactive data display mapping macro distribution."
    ],
    topologyJson: `// Pipeline_Topology.json
{
  "Input": ["Food_Photo", "Dietary_Goals"],
  "Vision_Engine": "Gemini Pro Vision",
  "Analysis": {
     "Macros": "Cal/Pro/Carb/Fat",
     "Risks": "Allergens"
  },
  "Output_Generator": "Custom Recipe & Insight UI"
}`
  },
  {
    id: "sra",
    title: "SRA Groups",
    stack: "FastAPI • React • React Native",
    description: "Comprehensive management system for real estate. Includes a backend API, Web Dashboard, and a Mobile App for worker self-check-ins.",
    githubUrl: "https://github.com/safwanmshereef/SRA-Groups",
    deliverables: [
      "Backend API handling distributed system coordination.",
      "Admin Web Dashboard for comprehensive oversight.",
      "Mobile App enabling worker self-check-ins via GPS.",
      "Supervisor QR verification for strict on-site authentication."
    ],
    architectureDetails: [
      "FastAPI orchestrating high-concurrency requests.",
      "React (Vite) frontend for performant admin management.",
      "React Native (Expo) mobile interface utilizing native device sensors.",
      "Strict geofencing implemented in backend spatial logic."
    ],
    topologyJson: `// Pipeline_Topology.json
[Mobile Client (GPS/QR)] -> [API Gateway]
                               |
[Web Admin (React)] -------> [Core Logic]
                               |
                        [Database Layer]`
  },
  {
    id: "cfta",
    title: "CFTA",
    stack: "Java • PHP • SCSS • Python",
    description: "Multi-platform project analyzing CO₂ emissions. Features a Java-based mobile app for tracking and a PHP web interface for deep data analysis.",
    githubUrl: "https://github.com/safwanmshereef/CFTA",
    deliverables: [
      "Java-based Android application for mobile CO2 emission tracking.",
      "PHP/Blade web interface serving as a comprehensive data portal.",
      "Jupyter Notebook Python analyses mapped to visual endpoints.",
      "Integration of SCSS for responsive dashboard components."
    ],
    architectureDetails: [
      "Mobile client structured for low-latency offline logging.",
      "Backend API synchronization mapping local data to cloud.",
      "Python data pipelines analyzing massive environmental datasets.",
      "Modular PHP components structuring dynamic views."
    ],
    topologyJson: `// Pipeline_Topology.json
{
  "Data_Collection": "Java Android App",
  "Data_Analysis": "Python (Jupyter/Pandas)",
  "Web_Presentation": "PHP/Blade Framework",
  "Styling": "SCSS Preprocessor"
}`
  },
  {
    id: "fruit_veggie",
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
      "TensorFlow model (trained_model.h5) serving inference.",
      "Image preprocessing pipeline normalizing webcam frames.",
      "Dictionary-based mapping of prediction labels to calorie tables.",
      "Optimized inference loop for lag-free Streamlit experience."
    ],
    topologyJson: `// Pipeline_Topology.json
[Webcam Feed] -> [OpenCV Preprocess]
                      |
              [TF Inference Model]
                      |
[Calorie Dict] <- [Class Label]
                      |
             [Streamlit Display]`
  },
  {
    id: "store_app",
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
      "FastAPI backend resolving carryover mismatches algorithmically.",
      "PostgreSQL database structuring relational inventory schemas.",
      "Tailwind CSS styling mapping responsive internal tool UI.",
      "Secure API routes handling sensitive external CRM syncing."
    ],
    topologyJson: `// Pipeline_Topology.json
{
  "Frontend": "Next.js (App Router)",
  "Auth": "OTP Verification Node",
  "Backend": "FastAPI Core",
  "Integrations": ["Zoho API", "GoFrugal API"],
  "Data": "PostgreSQL (Relational Inventory)"
}`
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

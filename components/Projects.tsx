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
      "Implemented a 'Context Inspector' allowing users to view raw similarity scores and retrieved chunks, bringing observability to AI reasoning."
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

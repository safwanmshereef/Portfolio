"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, X, ExternalLink, PlaySquare } from "lucide-react";

type Project = {
  id: string;
  title: string;
  stack: string;
  description: string;
  deepDive: string[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
  iframeSupport?: boolean;
};

const projects: Project[] = [
  {
    id: "rag",
    title: "Hybrid-RAG-AI-Assistant",
    stack: "Python • FAISS • LangChain • Streamlit • Gemini 3.1",
    description: "A production-grade AI Data Assistant featuring a unique Dual-Engine architecture. Seamlessly switch between local privacy (Ollama Qwen3.5) and cloud-based reasoning (Gemini 3.1 Flash) for maximum data security and low-latency processing.",
    features: [
      "🛡️ Dual-Engine Intelligence: Local offline inference via Ollama + Cloud API via Gemini.",
      "📚 Unified Knowledge RAG: Process multi-file PDFs, TXTs, CSVs and URL Scrape-to-RAG via FAISS.",
      "📊 Agentic Data Insight: Auto-generates interactive Plotly charts and handles Pandas calculations.",
      "🔊 Multimodal UX: Interactive Text-to-Speech (TTS) and Voice-to-Prompt capabilities."
    ],
    deepDive: [
      "Engineered a robust Multi-File processing pipeline utilizing LangChain, FAISS Vector Indexing, and HuggingFace all-MiniLM-L6-v2 embeddings.",
      "Implemented a 'Context Inspector' allowing users to view raw similarity scores and retrieved chunks, bringing observability to AI reasoning.",
      "Built resilient SQLite-based session management for renaming, deleting, and securely persisting chats locally."
    ],
    githubUrl: "https://github.com/safwanmshereef/Hybrid-RAG-AI-Assistant",
  },
  {
    id: "finance",
    title: "Finance-Dashboard",
    stack: "FastAPI • SQLAlchemy • Postgres • Streamlit",
    description: "A full-stack decoupled finance platform demonstrating sophisticated role-based access control (Viewer, Analyst, Admin) alongside real-time data persistence and analytics.",
    features: [
      "🔐 Advanced RBAC: Granular permissions for admins, analysts, and viewers over API endpoints.",
      "📊 Date-Range Analytics: Dashboard summary with monthly budget trackers and utilization indicators.",
      "🔍 Deep Search: Records explorer querying across categories and notes.",
      "📈 Export & Reporting: One-click CSV exports from filtered tables."
    ],
    deepDive: [
      "Developed a clean, layered FastAPI backend (routers, schemas, models, database) relying on strict Pydantic constraints and customized HTTP status error handling.",
      "Established secure JWT-based authentication flows with full session state management via Streamlit.",
      "Configured robust PostgreSQL deployments mapping ORM relationships between Users and Financial Records."
    ],
    githubUrl: "https://github.com/safwanmshereef/Finance-Dashboard",
  },
  {
    id: "release_app",
    title: "ProductionReleaseApp",
    stack: "Python • Streamlit • SQLite • Gemini AI",
    description: "An Enterprise Ops Hub serving as a centralized dashboard for tracking production releases, monitoring pipelines, and executing smart incident triage via integrated AI.",
    features: [
      "🚀 Live Job Tracking: Monitor release pipelines dynamically in real-time.",
      "🤖 Smart Ticketing: Auto-triage and generate resolutions for incidents using Gemini.",
      "📘 Knowledge Assistant: Query contextual operations documentation instantly.",
      "🗄️ SQLite Storage: Resilient tracking of deployments and logs locally."
    ],
    deepDive: [
      "Architected to streamline complex deployment environments, significantly reducing context-switching for site reliability engineers.",
      "Integrated Gemini to scan through active ticket queues, providing rapid mitigation steps based on incident context."
    ],
    githubUrl: "https://github.com/safwanmshereef/ProductionReleaseApp",
  },
  {
    id: "zenturio",
    title: "ZenturioChatbot",
    stack: "Python • Streamlit • Gemini 3.1 Pro",
    description: "A production-grade, highly context-aware AI assistant built entirely using Google's native Gemini SDK. Developed to tackle stringent multi-turn context requirements.",
    features: [
      "🧠 Context-Aware: Maintains conversation history, elegantly resolving complex pronouns over multi-turn prompts.",
      "🎛️ Token Optimizer: Uses 'tiktoken' for sliding-window truncation to preserve System Prompts and prevent memory crashes.",
      "🛡️ Anti-Hallucination: Employs a 400+ token System Prompt enforcing zero-repetition and mandatory clarification.",
      "⚡ Auto Model Engine: Scans API permissions to auto-connect to the most capable Gemini model available."
    ],
    deepDive: [
      "Engineered an observable dashboard tracking active session tokens, total API calls, and context window utilization in real-time.",
      "Developed an embedded SQLite engine allowing users to simultaneously manage, switch, rename, and persist multiple distinct chat threads securely."
    ],
    githubUrl: "https://github.com/safwanmshereef/ZenturioChatbot",
    demoUrl: "https://zenturiotechchatbot.streamlit.app",
    iframeSupport: true
  },
  {
    id: "nutriscan",
    title: "NutriScan AI",
    stack: "Python • Streamlit • Google Gemini Vision",
    description: "Your smart health companion. NutriScan AI dynamically converts food photos into meticulous nutritional insights, caloric breakdowns, and interactive diet-aware recipes.",
    features: [
      "📸 AI Food Scanner: Instant detection of calories, macros, health benefits, and potential risks via image upload.",
      "👨‍🍳 Intelligent Chef: Suggests customizable recipes adjusting to Vegan, Keto, or Paleo diets.",
      "📊 Progress Tracker: Interactive dashboard monitoring BMR goals and hydration levels.",
      "🏃 Burn-It-Off Calculator: Calculates exact durations required to run, walk, or bike off the ingested calories."
    ],
    deepDive: [
      "Integrated Google Gemini Vision Pro to process complex image arrays, accurately parsing food items directly into structured JSON payloads.",
      "Leveraged Plotly to render responsive, visually compelling Donut Charts representing macro-nutrient splits.",
      "Incorporated gTTS (Text-to-Speech) for an accessible, hands-free auditing experience."
    ],
    githubUrl: "https://github.com/safwanmshereef/nutriscan-ai",
  },
  {
    id: "sra",
    title: "SRA Groups",
    stack: "FastAPI • React (Vite) • React Native (Expo)",
    description: "A comprehensive Management & Attendance System designed for real-estate construction. Integrates a mobile app for field workers with a powerful CRM admin dashboard.",
    features: [
      "📍 Strict GPS Geofencing: Prevents fraudulent check-ins by locking workers to specific site coordinates.",
      "📱 Supervisor App: React Native interface for scanning worker QR codes and manual verification.",
      "📊 Admin Dashboard: Manage leaves, real-time attendance logs, brokers, and wage payments.",
      "🔐 Audit Trails: Comprehensive activity logging (check-ins, signups, site creations)."
    ],
    deepDive: [
      "Constructed a multi-platform ecosystem where the FastAPI backend synchronizes state across a React Vite Web Panel and an Expo Mobile App.",
      "Devised a complex geographic validation algorithm on the backend ensuring strict radius compliances around authorized construction zones."
    ],
    githubUrl: "https://github.com/safwanmshereef/SRA-Groups",
  },
  {
    id: "store_app",
    title: "Store Management System (Internship)",
    stack: "Next.js • Tailwind v4 • FastAPI • PostgreSQL",
    description: "An operational enterprise platform governing daily store compliances. Connects an OTP-secured Next.js frontend with an advanced stock verification FastAPI engine.",
    features: [
      "📦 Daily Stock Engine: Generates daily audit batches cross-referencing Freshivores catalog data against system stock.",
      "🔄 Carryover Logic: Intelligently pushes unresolved stock discrepancies into next-day verification batches.",
      "🔐 Role-based Routing: Tailored workflows for Admin, Manager, and Operational roles using JWT & OTP.",
      "📊 GoFrugal Integration: Seamlessly validates physical manager counts against central ERP system values."
    ],
    deepDive: [
      "Engineered a resilient background scheduler that continuously aggregates daily mismatch variances, triggering threshold-based notifications.",
      "Built a secure validation layer translating GoFrugal/Zoho catalog items into structured, paginated Next.js admin review screens."
    ],
    githubUrl: "https://github.com/safwanmshereef/store-application",
  },
  {
    id: "fruit_veggie",
    title: "Fruit Veggie Identifier",
    stack: "Python • OpenCV • TensorFlow • Streamlit",
    description: "A lightweight Computer Vision web application processing live webcam streams to classify fruits and vegetables in real-time.",
    features: [
      "📷 Live CV Feed: Captures frame-by-frame data via OpenCV to run continuous inference.",
      "🧠 TensorFlow Core: Utilizes a custom-trained model (.h5) to identify specific grocery items.",
      "🍎 Calorie Estimation: Overlays fundamental caloric and nutritional estimates onto detected items."
    ],
    deepDive: [
      "Demonstrates core edge-deployment techniques bridging specialized deep learning models (TensorFlow) into accessible web environments (Streamlit)."
    ],
    githubUrl: "https://github.com/safwanmshereef/FRUIT_VEGGIE_IDENTIFIER_BASICINFO_AND_CALORIE_ESTIMATOR",
  },
  {
    id: "cfta",
    title: "CFTA",
    stack: "Java (Android) • PHP • SCSS • Python (Jupyter)",
    description: "A multi-platform project actively analyzing global CO₂ emissions through a combination of mobile data tracking and complex statistical modeling.",
    features: [
      "📱 Mobile Tracking: A native Java Android application built to collect user emission data.",
      "🌐 Web Visualization: A PHP/Blade interface providing centralized management and analytics.",
      "📓 Deep Analysis: Embedded Jupyter Notebook routines parsing extensive datasets for statistical modeling."
    ],
    deepDive: [
      "Integrated multiple distinct technology stacks (Mobile, Web, Data Science) to create a cohesive data collection and analysis pipeline."
    ],
    githubUrl: "https://github.com/safwanmshereef/CFTA",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.id}`}
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="manga-panel p-6 cursor-pointer interactive group hover:border-sunset-orange/50 transition-colors"
          >
            <motion.div layoutId={`title-${project.id}`} className="font-display font-bold text-2xl mb-2 group-hover:text-sunset-orange transition-colors">
              {project.title}
            </motion.div>
            <motion.div layoutId={`stack-${project.id}`} className="font-mono text-xs text-neon-teal mb-4">
              {project.stack}
            </motion.div>
            <motion.div layoutId={`desc-${project.id}`} className="text-cream/70 text-sm line-clamp-2">
              {project.description}
            </motion.div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase text-cream/40">
              <span>View Data Logs</span>
              {project.iframeSupport && <span className="text-radiant-gold flex items-center"><PlaySquare size={14} className="mr-1"/> Live Demo</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${activeProject.id}`}
              className="manga-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 p-8 flex flex-col bg-ink"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 text-cream/50 hover:text-sunset-orange interactive"
              >
                <X size={24} />
              </button>

              <motion.div layoutId={`title-${activeProject.id}`} className="font-display font-bold text-3xl md:text-4xl mb-2 pr-12 text-sunset-orange">
                {activeProject.title}
              </motion.div>
              <motion.div layoutId={`stack-${activeProject.id}`} className="font-mono text-sm text-neon-teal mb-8 pb-4 border-b border-slate">
                {activeProject.stack}
              </motion.div>

              <motion.div layoutId={`desc-${activeProject.id}`} className="text-cream/90 leading-relaxed mb-8">
                <p className="mb-6 text-lg">{activeProject.description}</p>

                {activeProject.features && activeProject.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sunset-orange font-bold uppercase tracking-widest text-sm mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {activeProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-cream/80">
                           <span className="text-neon-teal mr-2 mt-0.5 font-mono">{">"}</span>
                           <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.deepDive && activeProject.deepDive.length > 0 && (
                  <div>
                    <h3 className="text-sunset-orange font-bold uppercase tracking-widest text-sm mb-3">Technical Deep Dive</h3>
                    <ul className="space-y-2">
                      {activeProject.deepDive.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-cream/70">
                           <span className="text-radiant-gold mr-2 mt-0.5 font-mono">{"*"}</span>
                           <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-slate hover:border-cream flex items-center space-x-2 font-mono text-sm uppercase interactive"
                >
                  <FolderGit2 size={16} />
                  <span>Repository Origin</span>
                </a>

                {activeProject.demoUrl && !activeProject.iframeSupport && (
                   <a
                     href={activeProject.demoUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-3 border border-radiant-gold text-radiant-gold flex items-center space-x-2 font-mono text-sm uppercase interactive"
                   >
                     <ExternalLink size={16} />
                     <span>External Uplink</span>
                   </a>
                )}
              </div>

              {activeProject.iframeSupport && activeProject.demoUrl && (
                <div className="w-full h-[500px] mt-4 border border-slate relative group rounded overflow-hidden">
                   <div className="absolute top-0 left-0 w-full p-2 bg-slate/50 font-mono text-[10px] uppercase text-cream/50 flex justify-between z-10 pointer-events-none">
                      <span>Streamlit Sandbox Uplink</span>
                      <span className="text-neon-teal blink">Online</span>
                   </div>
                   <iframe
                     src={activeProject.demoUrl}
                     title={`${activeProject.title} Demo`}
                     className="w-full h-full border-none pt-8"
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

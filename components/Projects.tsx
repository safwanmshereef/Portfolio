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
    id: "nutri",
    title: "NUTRI VISION",
    stack: "Python • Streamlit • YOLOv8 • Groq LLM",
    description: "An advanced, fully autonomous meal analysis system utilizing YOLOv8 computer vision and Groq-powered LLMs to calculate intricate nutritional profiles in real-time.",
    features: [
      "👁️ Computer Vision: Custom-trained YOLOv8 model deployed for instant, high-accuracy food item bounding box detection (achieved 0.81 mAP50-95).",
      "🧠 LLM Integration: Integrates LLaMA 3.1 70B Versatile via Groq API for lightning-fast, context-aware nutritional breakdowns.",
      "⚙️ OCR & Analysis: Features fallback OCR reading for packaged goods and detailed macro/micronutrient estimation.",
      "🎨 UI Framework: A heavily customized Streamlit application overcoming standard limitations via custom CSS for a premium, responsive feel."
    ],
    deepDive: [
      "Orchestrates a complex multi-model pipeline: User Input -> YOLOv8 Detection -> Heuristic Filtering -> Groq/LLaMA Prompting -> Output Render.",
      "Significantly optimized system latency, bringing total turnaround time from image upload to full analysis down to under 3 seconds.",
      "Implemented a robust prompt engineering strategy to enforce strict JSON schema outputs from the LLM, preventing parsing failures."
    ],
    githubUrl: "https://github.com/safwanmshereef/NUTRI_VISION_DETAILED_FOOD_ANALYSIS_AI_FOR_HEALTH_AND_WELLNESS",
    demoUrl: "https://safwanmshereef-nutri-vision-detailed-food--streamlit-app-i02n66.streamlit.app/",
    iframeSupport: true
  },
  {
    id: "finance",
    title: "FINANCE INSIGHT",
    stack: "Python • Streamlit • Gemini Flash 1.5",
    description: "A secure, specialized financial analytics dashboard providing high-speed, LLM-driven insights for enterprise fiscal data streams.",
    features: [
      "⚡ Lightning Inference: Powered by Google's Gemini Flash 1.5 for immediate query responses and narrative generation.",
      "🔒 Data Security: Architecture strictly separates core logic from the LLM, ensuring raw PII/financial data is never exposed to external models.",
      "📊 Intelligent Analytics: Automatically generates executive summaries, anomaly detection reports, and trend forecasts.",
      "🖥️ Dashboard: Clean, responsive UI built with Streamlit for visualizing complex fiscal data streams via interactive Plotly charts."
    ],
    deepDive: [
      "Addresses critical enterprise concerns regarding LLM data leakage by decoupling heuristic analysis from narrative generation.",
      "Implemented robust retry mechanisms and fallback logic for API rate limits and network instability.",
      "Engineered specialized prompting to ensure the LLM strictly adheres to financial terminologies and avoids hallucinating numbers."
    ],
    githubUrl: "https://github.com/safwanmshereef/Finance_insight",
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
    title: "STORE APP ANALYTICS",
    stack: "Python • Pandas • Scikit-Learn • Plotly",
    description: "An end-to-end data science project analyzing retail application performance, user retention, and sales forecasting using machine learning.",
    features: [
      "📊 Exploratory Data Analysis: Comprehensive EDA using Pandas and Seaborn to uncover hidden seasonal trends.",
      "🤖 Predictive Modeling: Trained Random Forest and Gradient Boosting models (Scikit-Learn) to forecast future application engagement.",
      "📈 Interactive Visualizations: Built dynamic, drill-down capable dashboards using Plotly to present findings to stakeholders.",
      "🧹 Data Wrangling: Complex ETL pipelines to clean, normalize, and impute missing values across millions of rows."
    ],
    deepDive: [
      "Transformed raw, noisy application telemetry logs into actionable business intelligence metrics.",
      "Handled significant class imbalance in user churn prediction by utilizing SMOTE and adjusting classification thresholds.",
      "Packaged the entire analysis into reproducible Jupyter Notebooks with extensive markdown documentation for peer review."
    ],
    githubUrl: "https://github.com/safwanmshereef/STOREAPP",
  },
  {
    id: "fruit_veggie",
    title: "Fruit Veggie Identifier",
    stack: "Python • OpenCV • TensorFlow • Streamlit",
    description: "A real-time, edge-capable computer vision engine designed for rapid classification and nutritional estimation of organic produce.",
    features: [
      "📷 Live CV Feed: Captures frame-by-frame image data via OpenCV to run continuous inference loops.",
      "🧠 Deep Learning Core: Utilizes a custom-trained CNN model (.h5 format via Keras/TensorFlow) optimized for low-latency predictions.",
      "🍎 Calorie Estimation: Overlays fundamental caloric and macro-nutritional estimates directly onto detected items in real-time.",
      "⚙️ Data Augmentation: Model trained on a highly augmented dataset to ensure robustness against varying lighting and angles."
    ],
    deepDive: [
      "Demonstrates core edge-deployment techniques bridging specialized deep learning models into accessible web environments.",
      "Optimized the TensorFlow model for inference speed, balancing accuracy with the need for high frame-rate processing.",
      "Implemented custom preprocessing pipelines to normalize webcam feeds before feeding them into the CNN."
    ],
    githubUrl: "https://github.com/safwanmshereef/FRUIT_VEGGIE_IDENTIFIER_BASICINFO_AND_CALORIE_ESTIMATOR",
  },
  {
    id: "cfta",
    title: "CFTA",
    stack: "Java (Android) • PHP • SCSS • Python (Jupyter)",
    description: "A comprehensive multi-platform ecosystem analyzing global CO₂ emissions through a combination of mobile data tracking and complex statistical modeling.",
    features: [
      "📱 Mobile Tracking: A native Java Android application built to accurately collect user transportation and energy usage data.",
      "🌐 Web Visualization: A robust PHP interface providing centralized management, user administration, and high-level analytics.",
      "📓 Deep Analysis: Embedded Python/Jupyter Notebook routines parsing extensive backend datasets for long-term statistical modeling.",
      "🗄️ Relational DB: Highly normalized PostgreSQL database architecture ensuring data integrity across thousands of users."
    ],
    deepDive: [
      "Successfully integrated multiple distinct technology stacks (Mobile frontend, Web admin, Data Science backend) into a cohesive pipeline.",
      "Designed secure RESTful APIs to facilitate communication between the Java mobile client and the PHP server.",
      "Implemented complex SQL aggregations to power the real-time analytics dashboard on the web portal."
    ],
    githubUrl: "https://github.com/safwanmshereef/CFTA",
  },
  {
    id: "zcb",
    title: "Zero Carbon Blockchain",
    stack: "Solidity • React • Node.js • Web3.js",
    description: "A decentralized platform utilizing blockchain technology to transparently track, verify, and trade carbon credits, preventing double-counting.",
    features: [
      "⛓️ Smart Contracts: Secure Solidity contracts deployed on Ethereum testnets to mint and burn carbon credit tokens.",
      "🌐 dApp Interface: A responsive React frontend integrating Web3.js for seamless user wallet connections (MetaMask).",
      "🔒 Verification System: Cryptographic verification ensuring that claimed carbon offsets are backed by real-world data.",
      "⚙️ Node.js Backend: An intermediary service for caching blockchain reads and handling off-chain metadata."
    ],
    deepDive: [
      "Tackled the 'double-spending' problem in carbon markets by leveraging the immutable ledger of a blockchain.",
      "Optimized smart contract gas costs by heavily refining data structures and utilizing event logs for state history.",
      "Implemented robust error handling for common Web3 transaction failures (e.g., dropped transactions, network congestion)."
    ],
    githubUrl: "https://github.com/safwanmshereef/ZCB",
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

              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Left Panel: Content */}
                <motion.div layoutId={`desc-${activeProject.id}`} className="flex-1 text-cream/90 leading-relaxed">
                  <p className="mb-6 text-lg">{activeProject.description}</p>

                  {activeProject.features && activeProject.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sunset-orange font-bold uppercase tracking-widest text-sm mb-3">Core Deliverables</h3>
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
                      <h3 className="text-sunset-orange font-bold uppercase tracking-widest text-sm mb-3">System Architecture Details</h3>
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

                {/* Right Panel: Architecture Diagram & Actions */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6">
                  <div className="border border-slate p-4 bg-ink/50 font-mono text-xs text-neon-teal rounded-md overflow-x-auto relative group">
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-sunset-orange"></div>
                      <div className="w-2 h-2 rounded-full bg-radiant-gold"></div>
                      <div className="w-2 h-2 rounded-full bg-neon-teal"></div>
                    </div>
                    <span className="text-cream/40 mb-2 block">// Pipeline_Topology.json</span>
                    <pre className="whitespace-pre-wrap mt-4 text-radiant-gold/80 leading-relaxed">
{`[User Input]
     │
     ▼
[API Gateway] ─► (Auth)
     │
     ▼
[Logic Core] ◄─► [Database]
     │
     ▼
[Output Renderer]
     │
     ▼
[Client Sync]`}
                    </pre>
                  </div>

                  <div className="flex flex-col gap-3">
                    {activeProject.demoUrl && !activeProject.iframeSupport && (
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-4 bg-sunset-orange/10 border border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-ink transition-colors flex items-center justify-center space-x-2 font-display font-bold uppercase tracking-wider interactive"
                      >
                        <PlaySquare size={18} />
                        <span>Launch Live Demo</span>
                      </a>
                    )}

                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-slate hover:border-cream flex items-center justify-center space-x-2 font-mono text-sm uppercase interactive transition-colors"
                    >
                      <FolderGit2 size={16} />
                      <span>Repository Origin</span>
                    </a>
                  </div>
                </div>
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

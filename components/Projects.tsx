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
};

const projects: Project[] = [
  {
    id: "rag",
    title: "Hybrid-RAG-AI-Assistant",
    stack: "Python • FAISS • LangChain • Streamlit • Gemini",
    description: "A production-grade AI Data Assistant with a Dual-Engine architecture. It switches between local privacy (Ollama) and cloud-based reasoning (Gemini). Features Multi-File RAG, Agentic Data Insight (auto-visualization), and voice-to-prompt multimodal interactions.",
    githubUrl: "https://github.com/safwanmshereef/Hybrid-RAG-AI-Assistant",
  },
  {
    id: "finance",
    title: "Finance-Dashboard",
    stack: "FastAPI • SQLAlchemy • Postgres • Streamlit",
    description: "Full-stack decoupled finance platform. Features robust role-based access control (viewer, analyst, admin), dynamic filtering, budget tracking, and real-time dashboard analytics with PostgreSQL and JWT Auth.",
    githubUrl: "https://github.com/safwanmshereef/Finance-Dashboard",
  },
  {
    id: "release_app",
    title: "ProductionReleaseApp",
    stack: "Python • Streamlit • SQLite • Gemini AI",
    description: "An Enterprise Ops Hub for monitoring pipelines and managing incidents. Includes real-time job tracking, AI-powered smart ticketing triage using Google Gemini, and a context-aware knowledge assistant.",
    githubUrl: "https://github.com/safwanmshereef/ProductionReleaseApp",
  },
  {
    id: "zenturio",
    title: "ZenturioChatbot",
    stack: "Python • Streamlit • Gemini 3.1 Pro",
    description: "Production-grade, context-aware AI assistant built with Google's native Gemini SDK. Features sliding-window token optimization to prevent crashes, multi-chat database persistence, and an auto model-detection engine.",
    githubUrl: "https://github.com/safwanmshereef/ZenturioChatbot",
    demoUrl: "https://zenturiotechchatbot.streamlit.app",
    iframeSupport: true
  },
  {
    id: "nutriscan",
    title: "NutriScan AI",
    stack: "Python • Streamlit • Google Gemini Vision",
    description: "Smart health companion. Uses Gemini Vision Pro to scan food photos, instantly detect calories and macros, highlight health risks, and dynamically act as an AI chef generating custom diet-aware recipes.",
    githubUrl: "https://github.com/safwanmshereef/nutriscan-ai",
  },
  {
    id: "sra",
    title: "SRA Groups",
    stack: "FastAPI • React (Vite) • React Native (Expo)",
    description: "Comprehensive management system for real estate. Includes a backend API, an Admin Web Dashboard, and a Mobile App for worker self-check-ins utilizing strict GPS geofencing and supervisor QR verification.",
    githubUrl: "https://github.com/safwanmshereef/SRA-Groups",
  },
  {
    id: "cfta",
    title: "CFTA",
    stack: "Java (Android) • PHP • SCSS • Python (Jupyter)",
    description: "Multi-platform project analyzing CO₂ emissions. Features a Java-based mobile application for tracking data and a PHP/Blade web interface for visualizing in-depth Jupyter Notebook Python analyses.",
    githubUrl: "https://github.com/safwanmshereef/CFTA",
  },
  {
    id: "fruit_veggie",
    title: "Fruit Veggie Identifier",
    stack: "Python • Streamlit • OpenCV • TensorFlow",
    description: "Computer Vision web application leveraging a trained TensorFlow model (trained_model.h5) to identify fruits and vegetables via webcam or image upload, estimating basic info and calorie counts.",
    githubUrl: "https://github.com/safwanmshereef/FRUIT_VEGGIE_IDENTIFIER_BASICINFO_AND_CALORIE_ESTIMATOR",
  },
  {
    id: "store_app",
    title: "Store Management System (Internship)",
    stack: "Next.js • Tailwind v4 • FastAPI • PostgreSQL",
    description: "Role-based operations platform with OTP authentication. The Next.js frontend drives tailored Admin/Manager dashboards, while the FastAPI backend orchestrates daily stock verification logic, carryover mismatches, and Zoho/GoFrugal integrations.",
    githubUrl: "https://github.com/safwanmshereef/store-application",
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
                {activeProject.description}
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

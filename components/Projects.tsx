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
    stack: "Python • PyTorch • FAISS • LangChain",
    description: "A production-grade AI Data Assistant with a unique Dual-Engine architecture allowing seamless switching between local privacy and cloud reasoning.",
    githubUrl: "https://github.com/safwanmshereef/Hybrid-RAG-AI-Assistant",
  },
  {
    id: "zenturio",
    title: "ZenturioChatbot",
    stack: "Python • Streamlit • LLM APIs",
    description: "Live, operational conversational AI interface focused on rapid prototyping, seamless session state management, and clear user experiences.",
    githubUrl: "https://github.com/safwanmshereef/ZenturioChatbot",
    demoUrl: "https://huggingface.co/spaces/safwanmshereef/ZenturioChatbot", // Placeholder space, assuming user setup
    iframeSupport: true
  },
  {
    id: "nutriscan",
    title: "NutriScan AI",
    stack: "Python • Gemini Vision",
    description: "Smart health companion. Scan food photos to track calories, macros using Gemini Vision. Features an AI Chef.",
    githubUrl: "https://github.com/safwanmshereef/nutriscan-ai",
  },
  {
    id: "finance",
    title: "Finance-Dashboard",
    stack: "Python",
    description: "Financial analytics dashboard and monitoring pipeline.",
    githubUrl: "https://github.com/safwanmshereef/Finance-Dashboard",
  },
  {
    id: "discord_bot",
    title: "Zenturio Discord Bot",
    stack: "Python • Discord.py • OpenAI API",
    description: "An intelligent Discord bot equipped with OpenAI API, enabling it to answer queries directly in server channels with seamless integration and state management.",
    githubUrl: "https://github.com/safwanmshereef/ZenturioBot",
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Database, Container, Brain, LayoutGrid, Terminal } from "lucide-react";

const skillNodes = [
  { id: "backend", label: "Backend Core", icon: Server, skills: ["Python", "FastAPI", "Node.js", "REST APIs", "C", "C++", "SQLAlchemy (ORM)"] },
  { id: "ai", label: "AI Orchestration", icon: Brain, skills: ["LangChain", "RAG Pipelines", "FAISS (Vector Indexing)", "Agentic Tool Calling", "TensorFlow", "OpenCV", "Prompt Tuning"] },
  { id: "ai-devtools", label: "AI Orchestration & Dev Tools", icon: Terminal, skills: [
    "Cursor / VS Code",
    "Google AI Studio",
    "Google Antigravity / Jules",
    "Claude Code / Qwen Code",
    "OpenCode / OpenAI Codex",
    "Ollama CLI & Models",
    "Lovable / Emergent / Repl.it",
    "Google Stitch",
    "Android Studio"
  ] },
  { id: "data", label: "Data Eng", icon: Database, skills: ["Advanced SQL", "PostgreSQL Schema Optimization", "Pandas", "RDBMS (PostgreSQL)"] },
  { id: "infra", label: "DevOps & Infrastructure", icon: Container, skills: ["Docker Containerization", "Cloud Compute Clusters", "Linux Systems Management", "Git/GitHub Version Control", "Firebase (Auth / Firestore / Data Connect)"] },
  { id: "frontend", label: "Frontend & Mobile", icon: LayoutGrid, skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Framer Motion"] },
];

export default function SkillTree() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-24 relative border-t-2 border-slate/50">
      <div className="absolute top-0 left-0 w-full h-full bg-dot-grid opacity-50 pointer-events-none -z-10" />

      <div className="mb-16">
        <h2 className="text-4xl font-display font-bold uppercase tracking-widest flex items-center space-x-4">
          <LayoutGrid className="text-neon-teal" />
          <span>The Jutsu Skill Tree</span>
        </h2>
        <p className="font-mono text-cream/50 mt-2">Hover to reveal circuit paths and active stack capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillNodes.map((node) => (
          <div
            key={node.id}
            className="relative"
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* The Node Header */}
            <motion.div
              className={`manga-panel p-6 border-l-4 interactive transition-colors duration-300 ${activeNode === node.id ? 'border-neon-teal bg-slate/80' : 'border-slate bg-transparent'}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <node.icon className={activeNode === node.id ? 'text-neon-teal' : 'text-cream/50'} size={28} />
                <h3 className="font-display font-bold text-xl uppercase">{node.label}</h3>
              </div>

              <ul className="space-y-2">
                {node.skills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: activeNode === node.id ? 1 : 0.6, x: activeNode === node.id ? 0 : -5 }}
                    transition={{ delay: idx * 0.1 }}
                    className="font-mono text-sm flex items-center space-x-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${activeNode === node.id ? 'bg-sunset-orange shadow-[0_0_8px_#ff5a5f]' : 'bg-slate'}`} />
                    <span className={activeNode === node.id ? 'text-cream' : 'text-cream/50'}>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connecting Circuit Animation (visible on hover) */}
            {activeNode === node.id && (
              <motion.div
                layoutId="circuit-glow"
                className="absolute -inset-2 bg-neon-teal/5 border border-neon-teal/20 rounded-lg -z-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

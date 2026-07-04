"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Database, BrainCircuit, ExternalLink } from "lucide-react";

type Character = {
  id: string;
  name: string;
  series: string;
  color: string;
  gradient: string;
};

const characters: Character[] = [
  { id: "eren", name: "Eren Yeager", series: "Attack on Titan", color: "#ff5a5f", gradient: "from-[#ff5a5f]/20 to-transparent" },
  { id: "zerotwo", name: "Zero Two", series: "Darling in the Franxx", color: "#ff758f", gradient: "from-[#ff758f]/20 to-transparent" },
  { id: "mai", name: "Mai Sakurajima", series: "Bunny Girl Senpai", color: "#00f5d4", gradient: "from-[#00f5d4]/20 to-transparent" },
  { id: "naruto", name: "Naruto Uzumaki", series: "Naruto", color: "#fee440", gradient: "from-[#fee440]/20 to-transparent" },
];

export default function Hero() {
  const [selectedChar, setSelectedChar] = useState<Character>(characters[0]);

  // Update global CSS variable when character changes to affect global theme
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--theme-color', selectedChar.color);
    document.documentElement.style.setProperty('--theme-gradient', selectedChar.gradient);
  }

  return (
    <section className="min-h-screen relative flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 pt-32 pb-16 overflow-hidden">
      {/* Background Particle Effects mapped to character color */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br from-[var(--theme-color)]/20 to-transparent pointer-events-none -z-10`}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Left Pane: Identity */}
      <div className="w-full lg:w-1/2 flex flex-col z-10 space-y-8">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 border border-slate rounded-full bg-slate/50 backdrop-blur-sm"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedChar.color, boxShadow: `0 0 10px ${selectedChar.color}` }}
            />
            <span className="text-sm font-mono text-cream/80">SYSTEM.ONLINE // LVL 23</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter"
          >
            Safwan <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${selectedChar.color}, #fff)` }}>
              Shereef
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cream/70 max-w-lg font-mono"
          >
            Backend Developer & Applied AI Engineer specializing in high-throughput data automation, optimized PostgreSQL architectures, and production-grade agentic RAG orchestration.
          </motion.p>
        </div>

        {/* Profile Image (Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 manga-panel shadow-[0_0_20px_rgba(0,0,0,0.5)] interactive group"
          style={{ borderColor: selectedChar.color, boxShadow: `0 0 20px ${selectedChar.color}80` }}
        >
          <img src="/images/safwan-portrait.jpg" alt="Safwan Shereef Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>

        {/* Identity Vectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 max-w-lg"
        >
          <div className="manga-panel p-4 flex items-center space-x-3 interactive">
            <Terminal size={24} style={{ color: selectedChar.color }} />
            <div>
              <p className="text-xs text-cream/50 uppercase font-mono">Core Stack</p>
              <p className="font-bold">Python / FastAPI</p>
            </div>
          </div>

          {/* Replaced Middle Card: Full-Stack AI */}
          <div className="manga-panel p-4 flex items-center space-x-3 interactive group relative">
            <BrainCircuit size={24} style={{ color: selectedChar.color }} className="flex-shrink-0" />
            <div className="relative z-10 bg-ink/80 rounded p-1">
              <p className="text-xs text-cream/50 uppercase font-mono">Full-Stack AI</p>
              <p className="font-bold text-sm leading-tight">FastAPI / LangChain / React</p>
            </div>

            {/* Hover Tooltip Overlay */}
            <div className="absolute inset-0 bg-ink/95 border border-neon-teal p-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 flex items-center shadow-[0_0_15px_rgba(0,245,212,0.3)]">
              <p className="font-mono text-[10px] text-cream/90 leading-tight">
                <span className="text-neon-teal font-bold block mb-1">// TELEMETRY</span>
                Orchestrating context-aware data retrieval pipelines via LangChain; serving high-concurrency API boundaries via FastAPI; and rendering live conversational chat frames through responsive React user interfaces.
              </p>
            </div>
          </div>

          <div className="manga-panel p-4 flex items-center space-x-3 interactive col-span-2">
            <Database size={24} style={{ color: selectedChar.color }} />
            <div>
              <p className="text-xs text-cream/50 uppercase font-mono">Data Architecture</p>
              <p className="font-bold">PostgreSQL Architecture</p>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="flex space-x-4 pt-4"
        >
          <a href="/documents/Safwan_Shereef_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border-2 font-bold uppercase tracking-wider interactive flex items-center space-x-2" style={{ borderColor: selectedChar.color, color: selectedChar.color }}>
            <span>View Codex (Resume)</span>
            <ExternalLink size={16} />
          </a>
          <a href="https://github.com/safwanmshereef" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cream text-ink font-bold uppercase tracking-wider interactive">
            Pull Source (GitHub)
          </a>
          <a href="https://www.linkedin.com/in/safwan-shereef/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#0A66C2] text-cream font-bold uppercase tracking-wider interactive">
            Connect (LinkedIn)
          </a>
        </motion.div>
      </div>

      {/* Right Pane: Character Select */}
      <div className="w-full lg:w-1/2 mt-16 lg:mt-0 flex flex-col items-end z-10">
        <div className="text-right mb-6">
          <h3 className="font-display text-2xl uppercase tracking-widest text-cream/50">Select Your Character</h3>
          <p className="font-mono text-sm" style={{ color: selectedChar.color }}>Active Aura: {selectedChar.series}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {characters.map((char) => (
            <motion.button
              key={char.id}
              onClick={() => setSelectedChar(char)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative manga-panel p-6 text-left interactive overflow-hidden ${selectedChar.id === char.id ? 'border-opacity-100' : 'border-opacity-30 border-slate'}`}
              style={{ borderColor: selectedChar.id === char.id ? char.color : undefined }}
            >
              {selectedChar.id === char.id && (
                <motion.div
                  layoutId="activeCharIndicator"
                  className="absolute inset-0 opacity-10 pointer-events-none z-0"
                  style={{ backgroundColor: char.color }}
                />
              )}
              <div className="relative z-10">
                <h4 className="font-display font-bold text-lg text-cream">{char.name}</h4>
                <p className="font-mono text-xs text-cream/60">{char.series}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* F1 nod */}
        <div className="mt-12 text-right">
             <p className="font-mono text-xs text-cream/40 uppercase tracking-widest">Racing Line Preference</p>
             <div className="flex space-x-3 mt-2 justify-end">
                <span className="w-3 h-3 rounded-full bg-ferrari shadow-[0_0_8px_#e10600] interactive" title="Ferrari / Hamilton" />
                <span className="w-3 h-3 rounded-full bg-mercedes shadow-[0_0_8px_#00a19b] interactive" title="Mercedes" />
                <span className="w-3 h-3 rounded-full bg-redbull shadow-[0_0_8px_#1e41ff] interactive" title="Red Bull / Verstappen" />
             </div>
        </div>
      </div>
    </section>
  );
}

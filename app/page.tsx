"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import SkillTree from "@/components/SkillTree";
import Projects from "@/components/Projects";
import Lifestyle from "@/components/Lifestyle";
import { Trophy } from "lucide-react";

export default function Home() {
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !achievementUnlocked) {
          setAchievementUnlocked(true);
          // Optional: Auto-hide after 5 seconds
          setTimeout(() => setAchievementUnlocked(false), 5000);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [achievementUnlocked]);

  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <SkillTree />
      <Projects />
      <Lifestyle />

      {/* Hidden trigger div for the achievement */}
      <div ref={bottomRef} className="h-4 w-full bg-transparent" />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate font-mono text-xs text-cream/40">
        <p>Built by Safwan Shereef. Framework: Next.js App Router & Tailwind CSS.</p>
        <p>Deployment: Vercel Free Tier. AI Spaces: Hugging Face.</p>
      </footer>

      {/* Achievement Popup */}
      <AnimatePresence>
        {achievementUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 manga-panel p-4 flex items-center space-x-4 border-radiant-gold shadow-[0_0_20px_rgba(254,228,64,0.3)] bg-ink/95"
          >
            <div className="bg-radiant-gold/20 p-2 rounded">
              <Trophy className="text-radiant-gold" size={24} />
            </div>
            <div>
              <p className="font-display font-bold text-radiant-gold uppercase tracking-wider text-sm">Achievement Unlocked!</p>
              <p className="font-mono text-xs text-cream/80">Master Automator</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

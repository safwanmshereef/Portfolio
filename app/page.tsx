"use client";

import Hero from "@/components/Hero";
import SkillTree from "@/components/SkillTree";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import F1MiniGame from "@/components/F1MiniGame";
import Lifestyle from "@/components/Lifestyle";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <SkillTree />
      <Experience />
      <Projects />
      <F1MiniGame />
      <Lifestyle />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate font-mono text-xs text-cream/40">
        <p>Built by Safwan Shereef. Framework: Next.js App Router & Tailwind CSS.</p>
        <p>Deployment: Vercel Free Tier. AI Spaces: Hugging Face.</p>
      </footer>
    </main>
  );
}

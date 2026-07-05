"use client";

import Hero from "@/components/Hero";
import SkillTree from "@/components/SkillTree";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import F1MiniGame from "@/components/F1MiniGame";
import AnimeMiniGame from "@/components/AnimeMiniGame";
import Lifestyle from "@/components/Lifestyle";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <SkillTree />
      <Experience />
      <Projects />

      {/* Interactive Arcade Section */}
      <section className="py-24 px-8 lg:px-24 relative border-t border-slate/30 bg-gradient-to-b from-ink to-[#0f141c]">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-display font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-radiant-gold to-sunset-orange">
            The Arcade
          </h2>
          <p className="font-mono text-cream/50 mt-2">Interactive testing modules.</p>
        </div>

        <AnimeMiniGame />
        <F1MiniGame />
      </section>

      <Lifestyle />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate font-mono text-xs text-cream/40">
        <p>Built by Safwan Shereef. Framework: Next.js App Router & Tailwind CSS.</p>
        <p>Deployment: Vercel Free Tier. AI Spaces: Hugging Face.</p>
      </footer>
    </main>
  );
}

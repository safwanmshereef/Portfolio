"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CarFront,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import ExternalFrame from "./ExternalFrame";

type ProjectId = "rag" | "sra" | "zenturio" | "nutriscan" | "release" | "cfta";

type Project = {
  id: ProjectId;
  title: string;
  category: string;
  description: string;
  detail: string;
  stack: string[];
  href?: string;
};

type Experience = {
  period: string;
  role: string;
  company: string;
  points: string[];
};

type Skill = {
  name: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.65, ease: "easeOut" }
};

const experiences: Experience[] = [
  {
    period: "Feb 2026 - Present",
    role: "Software Engineer Intern",
    company: "Freshivores",
    points: [
      "Developed a React and FastAPI store operations portal supporting 50+ daily active internal users.",
      "Implemented RBAC, type-safe API integration, PostgreSQL schema work, and Dockerized environments.",
      "Reduced complex query latency by 15% through schema and SQL optimization."
    ]
  },
  {
    period: "Sep 2024 - Apr 2025",
    role: "Python Developer Intern",
    company: "Singularis Software Technologies",
    points: [
      "Built Python ETL automation across CSV and Excel pipelines.",
      "Reduced manual data processing effort by 30% through repeatable data workflows."
    ]
  },
  {
    period: "Apr 2023 - May 2023",
    role: "AI and Computer Vision Intern",
    company: "Techmaghi",
    points: [
      "Designed TensorFlow and OpenCV applications with cleaner preprocessing paths.",
      "Improved computer vision preprocessing accuracy by 20%."
    ]
  }
];

const projects: Project[] = [
  {
    id: "rag",
    title: "Hybrid RAG AI Assistant",
    category: "AI Systems",
    description:
      "Dual-engine retrieval assistant with FAISS vector search, Gemini, Ollama, LangChain, and Streamlit.",
    detail:
      "A full-stack AI data assistant built around strict contextual accuracy. It can move between local privacy and cloud reasoning while keeping retrieval grounded in indexed documents.",
    stack: ["Python", "LangChain", "FAISS", "Gemini", "Ollama", "Streamlit"],
    href: "https://github.com/safwanmshereef/Hybrid-RAG-AI-Assistant"
  },
  {
    id: "sra",
    title: "SRA Groups Attendance and Management",
    category: "Full Stack",
    description:
      "Attendance platform with GPS geofencing, RBAC, audit logging, REST APIs, Firebase, and Docker.",
    detail:
      "A web and mobile operations platform that connects field attendance workflows with secure backend logic and practical audit trails.",
    stack: ["FastAPI", "React Native", "React", "Firebase", "Docker", "RBAC"]
  },
  {
    id: "zenturio",
    title: "Zenturio Chatbot",
    category: "Conversational AI",
    description:
      "Context-aware assistant with Gemini SDK, Streamlit, prompt engineering, SQLite persistence, and token handling.",
    detail:
      "A production-minded chatbot assignment focused on session durability, secure configuration, clean UX, and predictable assistant behavior.",
    stack: ["Python", "Gemini SDK", "SQLite", "Tiktoken", "Streamlit"],
    href: "https://github.com/safwanmshereef/ZenturioChatbot"
  },
  {
    id: "nutriscan",
    title: "NutriScan AI",
    category: "Vision AI",
    description:
      "Gemini Vision health companion for meal classification, nutrition logging, BMI/BMR profiling, and AI Chef recipes.",
    detail:
      "A smart health assistant that turns food photos into structured nutrition context and recipe suggestions.",
    stack: ["Python", "Gemini Vision", "Computer Vision", "Streamlit"],
    href: "https://github.com/safwanmshereef/nutriscan-ai"
  },
  {
    id: "release",
    title: "ProductionReleaseApp",
    category: "Ops Dashboard",
    description:
      "AI-powered operations dashboard for monitoring pipelines, managing incidents, and assistant-led collaboration.",
    detail:
      "An engineering operations dashboard that brings backend reliability, pipeline visibility, and assistant workflows into one product surface.",
    stack: ["Python", "AI Assistant", "Dashboards", "Pipelines", "Incidents"],
    href: "https://github.com/safwanmshereef/ProductionReleaseApp"
  },
  {
    id: "cfta",
    title: "CFTA Carbon Footprint Tracking App",
    category: "Sustainability",
    description:
      "Android and Laravel carbon app with SQLite operations, ML regression, APIs, validation, and server-side logic.",
    detail:
      "A sustainability-first app that connects personal footprint tracking with practical data storage and backend API work.",
    stack: ["Android", "Java", "Laravel", "SQLite", "ML Regression"],
    href: "https://github.com/safwanmshereef/CFTA"
  }
];

const skills: Skill[] = [
  { name: "Python", group: "backend", icon: Code2 },
  { name: "FastAPI", group: "backend", icon: Rocket },
  { name: "React", group: "frontend", icon: Sparkles },
  { name: "React Native", group: "frontend", icon: Sparkles },
  { name: "LangChain", group: "ai", icon: BrainCircuit },
  { name: "FAISS", group: "ai", icon: Bot },
  { name: "Gemini", group: "ai", icon: Bot },
  { name: "PostgreSQL", group: "data", icon: Database },
  { name: "SQLite", group: "data", icon: Database },
  { name: "Docker", group: "infra", icon: ShieldCheck },
  { name: "GitHub Actions", group: "infra", icon: Github },
  { name: "Google Cloud", group: "cloud", icon: Cloud }
];

const skillProjectMap: Record<string, ProjectId[]> = {
  backend: ["sra", "release", "cfta"],
  frontend: ["sra", "release"],
  ai: ["rag", "zenturio", "nutriscan", "release"],
  data: ["rag", "zenturio", "cfta"],
  infra: ["rag", "sra", "release"],
  cloud: ["rag", "release"]
};

const navItems = ["Work", "Projects", "Skills", "Codex"];

export default function PortfolioExperience() {
  const [boosted, setBoosted] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const linkedProjects = useMemo(() => {
    if (!activeSkill) {
      return new Set<ProjectId>();
    }

    return new Set(skillProjectMap[activeSkill] ?? []);
  }, [activeSkill]);

  return (
    <main
      className={`min-h-screen overflow-hidden text-ink transition-colors duration-500 ${
        boosted ? "selection:bg-ferrari" : "selection:bg-sakura"
      }`}
    >
      <Ambient boosted={boosted} />
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/75 px-4 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 font-display text-base font-bold">
            <span className="grid size-10 place-items-center rounded-full bg-[conic-gradient(from_140deg,#ff4f8b,#ffbd3f,#21d6d0,#4f46e5,#ff4f8b)] text-white shadow-glow">
              SS
            </span>
            <span className="hidden sm:inline">Safwan Shereef</span>
          </a>

          <nav className="hidden rounded-full border border-ink/10 bg-white/60 p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-bold text-plum transition hover:bg-white hover:text-ink"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-pressed={boosted}
            onClick={() => setBoosted((value) => !value)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 font-mono text-sm font-bold text-plum shadow-sm transition hover:-translate-y-0.5 hover:text-ink"
          >
            <span
              className={`size-2.5 rounded-full shadow-[0_0_18px_currentColor] ${
                boosted ? "bg-ferrari text-ferrari" : "bg-mercedes text-mercedes"
              }`}
            />
            DRS
          </button>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-12 md:px-10 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs font-bold uppercase tracking-normal text-sakura">
            Bangalore / Kottayam / Applied AI Systems
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-bold leading-[0.9] text-ink sm:text-7xl lg:text-8xl">
            Backend engineer with anime color, AI depth, and race-day precision.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-plum">
            I design secure APIs, scalable data flows, and context-aware GenAI systems
            with FastAPI, React, PostgreSQL, Docker, LangChain, FAISS, Gemini, and
            Streamlit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <IconButton href="#projects" label="View Projects" icon={ArrowUpRight} variant="primary" />
            <IconButton href="/documents/Safwan_Shereef_Resume.pdf" label="Resume" icon={Download} />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat value="50+" label="portal users supported" />
            <Stat value="15%" label="query latency reduction" />
            <Stat value="6x" label="Google Cloud certified" />
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          className="relative mx-auto grid min-h-[530px] w-full max-w-[520px] place-items-center"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute aspect-square w-[92%] rounded-full bg-[conic-gradient(from_90deg,#ffbd3f,#ff4f8b,#21d6d0,#4f46e5,#ffbd3f)] opacity-70 blur-[1px]"
          />
          <div className="absolute aspect-square w-[86%] rounded-full bg-race-stripes opacity-30" />
          <div className="relative aspect-[0.72] w-[min(82vw,390px)] rotate-[1.5deg] overflow-hidden rounded-lg border border-ink/15 bg-white/75 p-3 shadow-anime">
            <Image
              src="/images/safwan-portrait.jpg"
              alt="Safwan Shereef under warm lantern lights"
              fill
              priority
              sizes="(max-width: 768px) 82vw, 390px"
              className="rounded-md object-cover p-3"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sunshine/40 to-transparent mix-blend-screen" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-0 w-[min(280px,76vw)] rounded-lg border border-ink/10 bg-white/85 p-4 shadow-anime backdrop-blur"
          >
            <span className="font-mono text-xs font-bold text-sakura">live.system</span>
            <strong className="mt-1 block font-display text-lg">RAG pipeline stable</strong>
            <div className="mt-4 grid gap-2">
              {[100, 78, 58].map((width) => (
                <motion.span
                  key={width}
                  initial={{ scaleX: 0.5 }}
                  animate={{ scaleX: [0.48, 1, 0.48] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: `${width}%`, transformOrigin: "left" }}
                  className="h-2 rounded-full bg-gradient-to-r from-aqua via-circuit to-sakura"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Section id="work" eyebrow="Storyboard Timeline" title="Experience panels">
        <div className="grid gap-5">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.period}`}
              {...fadeUp}
              transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
              className="relative overflow-hidden rounded-lg border border-ink/10 bg-white/70 p-6 shadow-anime backdrop-blur md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sakura via-sunshine to-aqua" />
              <p className="font-mono text-xs font-bold text-circuit">{experience.period}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{experience.role}</h3>
              <p className="mt-1 font-semibold text-plum">{experience.company}</p>
              <ul className="mt-5 grid gap-3 text-plum">
                {experience.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-7">
                    <BriefcaseBusiness className="mt-1 size-4 shrink-0 text-sakura" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Manga Panel Deployments" title="Selected projects">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              {...fadeUp}
              transition={{ duration: 0.58, delay: index * 0.04, ease: "easeOut" }}
              className={`relative flex min-h-[315px] flex-col overflow-hidden rounded-lg border bg-white/70 p-6 shadow-anime backdrop-blur transition duration-300 hover:-translate-y-1 ${
                linkedProjects.has(project.id)
                  ? "border-sakura/70 shadow-glow"
                  : "border-ink/10 hover:border-sakura/40"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sakura via-sunshine to-aqua" />
              <div className="flex items-center justify-between gap-3 font-mono text-xs font-bold uppercase text-sakura">
                <span>{project.category}</span>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
                    <Github className="size-4" />
                  </a>
                ) : (
                  <Code2 className="size-4" />
                )}
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{project.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-plum">{project.description}</p>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white/80 px-4 py-2 font-bold transition hover:-translate-y-0.5 hover:border-sakura/40"
              >
                <Sparkles className="size-4 text-sakura" />
                Expand Panel
              </button>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Jutsu Scroll" title="Technical arsenal">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <motion.button
                key={skill.name}
                {...fadeUp}
                type="button"
                onMouseEnter={() => setActiveSkill(skill.group)}
                onMouseLeave={() => setActiveSkill(null)}
                onFocus={() => setActiveSkill(skill.group)}
                onBlur={() => setActiveSkill(null)}
                className="flex min-h-24 flex-col items-start justify-between rounded-lg border border-ink/10 bg-white/70 p-4 text-left font-bold shadow-sm transition hover:-translate-y-1 hover:border-sakura/40 hover:bg-white/90 hover:shadow-glow"
              >
                <Icon className="size-5 text-circuit" />
                <span>{skill.name}</span>
              </motion.button>
            );
          })}
        </div>
      </Section>

      <Section id="codex" eyebrow="F1 Telemetry Lane" title="Systems thinking at racing speed">
        <div className="grid gap-4 md:grid-cols-3">
          <RacingCard team="Ferrari" value="precision under pressure" className="from-ferrari to-coral" />
          <RacingCard team="Mercedes" value="engineering discipline" className="from-mercedes to-ink" />
          <RacingCard team="Red Bull" value="aggressive iteration" className="from-redbull to-sakura" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {["Hamilton", "Verstappen", "Senna"].map((driver) => (
            <span
              key={driver}
              className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 font-mono text-sm font-bold text-plum"
            >
              {driver}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Filler Episodes" title="Personal codex">
        <div className="grid gap-5 md:grid-cols-3">
          <CodexCard
            title="Anime matrix"
            body="Naruto, SAO, Darling in the Franxx, Your Name, Dandadan, Bunny Girl Senpai, and Attack on Titan guide the motion language."
          />
          <CodexCard
            title="Travel logs"
            body="Kochi, Alappuzha, Vagamon, Ooty, Bangalore, Gundmi kayaking, and Kottayam roots keep the page warm and grounded."
          />
          <CodexCard
            title="Fuel map"
            body="Loaded fries, burgers, cheese rumali shawarma, momos, noodles, IKEA meatballs, and Kerala fish curry power the sprint board."
          />
        </div>
      </Section>

      <Section eyebrow="External AI Embed" title="Live assistant slot">
        <ExternalFrame title="Streamlit or Hugging Face Space embed" src="https://huggingface.co/spaces" />
      </Section>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-24 pt-12 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs font-bold uppercase tracking-normal text-sakura">Final Lap</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Build something grounded, fast, and memorable.
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="flex flex-wrap gap-3">
          <IconButton href="mailto:safwanmshereef7@gmail.com" label="Email" icon={Mail} variant="primary" />
          <IconButton href="https://www.linkedin.com/in/safwan-shereef/" label="LinkedIn" icon={Linkedin} />
          <IconButton href="https://github.com/safwanmshereef?tab=repositories" label="GitHub" icon={Github} />
        </motion.div>
      </section>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ y: 24, scale: 0.94, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-2xl rounded-lg border border-white/50 bg-white/95 p-6 shadow-anime md:p-9"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition hover:-translate-y-0.5"
                aria-label="Close project panel"
              >
                <X className="size-4" />
              </button>
              <p className="font-mono text-xs font-bold uppercase tracking-normal text-sakura">
                {activeProject.category}
              </p>
              <h2 id="project-modal-title" className="mt-3 pr-10 font-display text-3xl font-bold md:text-5xl">
                {activeProject.title}
              </h2>
              <p className="mt-5 leading-8 text-plum">{activeProject.detail}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeProject.stack.map((item) => (
                  <span key={item} className="rounded-full border border-ink/10 bg-cream px-3 py-2 font-mono text-xs font-bold">
                    {item}
                  </span>
                ))}
              </div>
              {activeProject.href ? (
                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-3 font-bold text-white transition hover:-translate-y-0.5"
                >
                  Open repository
                  <ExternalLink className="size-4" />
                </a>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function Ambient({ boosted }: { boosted: boolean }) {
  const petals = [
    { left: "12%", delay: 0, color: "bg-sakura/35" },
    { left: "38%", delay: 1.8, color: "bg-sunshine/45" },
    { left: "68%", delay: 3.2, color: "bg-aqua/35" },
    { left: "86%", delay: 5.1, color: "bg-coral/35" }
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.span
          key={`${petal.left}-${petal.delay}`}
          className={`absolute top-[-40px] h-5 w-3 rounded-[60%_40%_60%_40%] ${petal.color}`}
          style={{ left: petal.left }}
          animate={{ y: ["0vh", "110vh"], x: [0, boosted ? 160 : 80], rotate: [0, 360] }}
          transition={{ duration: boosted ? 7 : 13, repeat: Infinity, delay: -petal.delay, ease: "linear" }}
        />
      ))}
      {[22, 48, 78].map((top, index) => (
        <motion.span
          key={top}
          className="absolute right-[-36vw] h-0.5 w-[34vw] rotate-[-10deg] bg-gradient-to-r from-transparent via-circuit/40 to-transparent"
          style={{ top: `${top}%` }}
          animate={{ x: ["0vw", "-140vw"] }}
          transition={{ duration: boosted ? 2.4 : 5.5, repeat: Infinity, delay: -index * 1.4, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-24">
      <motion.div {...fadeUp} className="mb-10">
        <p className="font-mono text-xs font-bold uppercase tracking-normal text-sakura">{eyebrow}</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white/70 p-4 shadow-sm backdrop-blur">
      <strong className="block font-display text-2xl text-circuit">{value}</strong>
      <span className="mt-1 block text-sm font-semibold text-plum">{label}</span>
    </div>
  );
}

function IconButton({
  href,
  label,
  icon: Icon,
  variant = "ghost"
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  variant?: "primary" | "ghost";
}) {
  const classes =
    variant === "primary"
      ? "bg-gradient-to-r from-sakura via-coral to-sunshine text-white shadow-glow"
      : "border border-ink/10 bg-white/75 text-ink";

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold transition hover:-translate-y-0.5 ${classes}`}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      <Icon className="size-4" />
      {label}
    </a>
  );
}

function RacingCard({ team, value, className }: { team: string; value: string; className: string }) {
  return (
    <motion.article
      {...fadeUp}
      className={`relative min-h-40 overflow-hidden rounded-lg bg-gradient-to-br p-6 text-white shadow-anime ${className}`}
    >
      <div className="absolute bottom-4 left-4 right-[-30%] h-10 skew-x-[-22deg] bg-race-stripes opacity-25" />
      <CarFront className="relative z-10 size-6" />
      <p className="relative z-10 mt-8 font-mono text-xs font-bold uppercase tracking-normal text-white/80">{team}</p>
      <strong className="relative z-10 mt-2 block font-display text-2xl leading-tight">{value}</strong>
    </motion.article>
  );
}

function CodexCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.article {...fadeUp} className="relative overflow-hidden rounded-lg border border-ink/10 bg-white/70 p-6 shadow-anime">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sakura via-sunshine to-aqua" />
      <MapPin className="size-5 text-circuit" />
      <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-plum">{body}</p>
    </motion.article>
  );
}

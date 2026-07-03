import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#211829",
        plum: "#5a3f73",
        cream: "#fff7ed",
        sakura: "#ff4f8b",
        coral: "#ff6b4a",
        sunshine: "#ffbd3f",
        aqua: "#21d6d0",
        circuit: "#4f46e5",
        ferrari: "#e10600",
        mercedes: "#00a19b",
        redbull: "#1e41ff"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        anime: "0 24px 80px rgba(90, 63, 115, 0.18)",
        glow: "0 0 42px rgba(255, 79, 139, 0.24)"
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(33, 24, 41, 0.12) 1px, transparent 0)",
        "race-stripes":
          "repeating-linear-gradient(110deg, rgba(255,255,255,0.8) 0 18px, transparent 18px 30px)"
      }
    }
  },
  plugins: []
};

export default config;

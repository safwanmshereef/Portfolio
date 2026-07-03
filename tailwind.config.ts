import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f141c",
        slate: "#1a1f2e",
        cream: "#fff7ed",
        "neon-teal": "#00f5d4",
        "sunset-orange": "#ff5a5f",
        "cherry-pink": "#ff758f",
        "radiant-gold": "#fee440",
        ferrari: "#e10600",
        mercedes: "#00a19b",
        redbull: "#1e41ff"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        anime: "4px 4px 0px 0px rgba(0, 245, 212, 1)",
        "anime-hover": "8px 8px 0px 0px rgba(255, 90, 95, 1)",
        glow: "0 0 42px rgba(255, 117, 143, 0.4)",
        "glow-teal": "0 0 42px rgba(0, 245, 212, 0.4)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
        "race-stripes":
          "repeating-linear-gradient(110deg, rgba(255,255,255,0.8) 0 18px, transparent 18px 30px)"
      }
    }
  },
  plugins: []
};

export default config;

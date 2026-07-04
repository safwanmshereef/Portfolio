"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// List of all characters requested + Pokemon
const CHARACTERS = [
  // Existing local pokemon
  { id: 1, name: "Pikachu", type: "img", url: "/assets/anime/pikachu.gif", color: "#fee440", scale: 1.5, funAnim: "bounce" },
  { id: 2, name: "Charizard", type: "img", url: "/assets/anime/charizard.gif", color: "#ff5a5f", scale: 1.5, funAnim: "fly" },
  { id: 3, name: "Blastoise", type: "img", url: "/assets/anime/blastoise.gif", color: "#00f5d4", scale: 1.5, funAnim: "walk" },
  { id: 4, name: "Venusaur", type: "img", url: "/assets/anime/venusaur.gif", color: "#4ade80", scale: 1.5, funAnim: "walk" },

  // New Characters (Using CSS/Framer text-based dynamic rendering or placeholders if sprites aren't available)
  // Instead of static images that may not exist, we'll use a stylized text approach for the new ones, which looks very "hacker/anime" and guarantees they render and move dynamically.
  { id: 5, name: "Naruto", type: "text", text: "🍥 Naruto", color: "#f97316", scale: 1.5, funAnim: "spin" },
  { id: 6, name: "Zero Two", type: "text", text: "🎀 Zero Two", color: "#f43f5e", scale: 1.5, funAnim: "fly" },
  { id: 7, name: "Mai Sakurajima", type: "text", text: "🐰 Mai", color: "#a855f7", scale: 1.5, funAnim: "fadeBounce" },
  { id: 8, name: "Turbo Granny", type: "text", text: "👵 Turbo Granny", color: "#10b981", scale: 1.5, funAnim: "zoom" },
  { id: 9, name: "Okarun", type: "text", text: "👓 Okarun", color: "#3b82f6", scale: 1.5, funAnim: "zigzag" },
  { id: 10, name: "Momo", type: "text", text: "🍑 Momo", color: "#ec4899", scale: 1.5, funAnim: "float" },
  { id: 11, name: "Kakashi", type: "text", text: "📖 Kakashi", color: "#64748b", scale: 1.5, funAnim: "teleport" },
  { id: 12, name: "Itachi", type: "text", text: "🦅 Itachi", color: "#dc2626", scale: 1.5, funAnim: "float" },
  { id: 13, name: "Tsunade", type: "text", text: "🐌 Tsunade", color: "#84cc16", scale: 1.5, funAnim: "bounce" },
  { id: 14, name: "Hinata", type: "text", text: "💜 Hinata", color: "#d946ef", scale: 1.5, funAnim: "walk" },
  { id: 15, name: "Seiko", type: "text", text: "🔮 Seiko", color: "#0ea5e9", scale: 1.5, funAnim: "spin" },
  { id: 16, name: "Kirito", type: "text", text: "⚔️ Kirito", color: "#1e293b", scale: 1.5, funAnim: "zigzag" },
  { id: 17, name: "Asuna", type: "text", text: "🤺 Asuna", color: "#fca5a5", scale: 1.5, funAnim: "fly" },
  { id: 18, name: "Rem", type: "text", text: "❄️ Rem", color: "#60a5fa", scale: 1.5, funAnim: "bounce" },
  { id: 19, name: "Yor Forger", type: "text", text: "🌹 Yor", color: "#be123c", scale: 1.5, funAnim: "teleport" },
  { id: 20, name: "Akari Watanabe", type: "text", text: "🌸 Akari", color: "#fbcfe8", scale: 1.5, funAnim: "float" },
  { id: 21, name: "Stella", type: "text", text: "🔥 Stella", color: "#ef4444", scale: 1.5, funAnim: "fly" },
  { id: 22, name: "Marin Kitagawa", type: "text", text: "👗 Marin", color: "#fde047", scale: 1.5, funAnim: "spin" },
  { id: 23, name: "Alisa Kujou", type: "text", text: "🇷🇺 Alisa", color: "#cbd5e1", scale: 1.5, funAnim: "walk" },
  { id: 24, name: "Miyako Shikimori", type: "text", text: "✨ Shikimori", color: "#f472b6", scale: 1.5, funAnim: "fadeBounce" },
  { id: 25, name: "Rias", type: "text", text: "😈 Rias (DxD)", color: "#991b1b", scale: 1.5, funAnim: "float" },
  { id: 26, name: "Chizuru", type: "text", text: "👘 Chizuru", color: "#fb923c", scale: 1.5, funAnim: "walk" }
];

export default function AnimatedCharacters() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Helper to generate fun internal animations based on type
  const getFunAnimation = (type: string) => {
    switch (type) {
      case "bounce":
        return { y: [0, -30, 0], transition: { duration: 0.6, repeat: Infinity, ease: "easeOut" } };
      case "spin":
        return { rotate: [0, 360], transition: { duration: 2, repeat: Infinity, ease: "linear" } };
      case "fly":
        return { y: [0, -10, 10, 0], x: [0, 10, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
      case "zoom":
        return { scale: [1, 1.5, 1], x: [0, 50, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case "zigzag":
        return { y: [0, -40, 40, 0], transition: { duration: 1.5, repeat: Infinity, ease: "linear" } };
      case "float":
        return { y: [0, -20, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
      case "teleport":
        return { opacity: [1, 0, 1], scale: [1, 0.8, 1], x: [0, 20, 0], transition: { duration: 1.2, repeat: Infinity, ease: "steps(3)" } };
      case "fadeBounce":
        return { y: [0, -20, 0], opacity: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case "walk":
      default:
        return { y: [0, -10, 0], rotate: [-5, 5, -5], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {CHARACTERS.map((char, index) => {
        // Generate random multi-directional paths
        const isLeftToRight = Math.random() > 0.5;
        const startX = isLeftToRight ? "-20vw" : "120vw";
        const endX = isLeftToRight ? "120vw" : "-20vw";

        // Spread them out across the whole screen height now that there are so many
        const startY = `${10 + Math.random() * 80}vh`;
        const midY1 = `${10 + Math.random() * 80}vh`;
        const midY2 = `${10 + Math.random() * 80}vh`;
        const endY = `${10 + Math.random() * 80}vh`;

        // Vary the speed so some are fast and some are slow
        const duration = 10 + Math.random() * 25; // 10s to 35s duration
        const delay = Math.random() * 20; // Staggered start times up to 20s

        // Flip horizontally if moving right to left (for images)
        const scaleX = isLeftToRight ? 1 : -1;

        return (
          <motion.div
            key={char.id}
            initial={{ x: startX, y: startY, opacity: 0 }}
            animate={{
              x: [startX, startX === "-20vw" ? "50vw" : "50vw", endX],
              y: [startY, midY1, midY2, endY],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
              times: [0, 0.2, 0.8, 1]
            }}
            style={{
              position: 'absolute',
            }}
            className="pointer-events-none flex items-center justify-center"
          >
            <motion.div
               animate={getFunAnimation(char.funAnim)}
               transition={getFunAnimation(char.funAnim).transition}
            >
              {char.type === "img" ? (
                <img
                   src={char.url}
                   alt={char.name}
                   className="object-contain"
                   style={{
                     filter: `drop-shadow(0 0 10px ${char.color})`,
                     transform: `scaleX(${scaleX}) scale(${char.scale})`,
                     width: '80px',
                     height: '80px'
                   }}
                />
              ) : (
                <div
                  className="px-3 py-1 rounded-full font-display font-bold text-sm whitespace-nowrap bg-ink/80 border"
                  style={{
                    color: char.color,
                    borderColor: char.color,
                    boxShadow: `0 0 15px ${char.color}80, inset 0 0 10px ${char.color}40`,
                    textShadow: `0 0 5px ${char.color}`
                  }}
                >
                  {char.text}
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

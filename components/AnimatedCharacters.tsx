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

  // Real Anime GIFs
  { id: 5, name: "Naruto", type: "img", url: "/assets/anime/naruto.gif", color: "#f97316", scale: 1.5, funAnim: "walk" },
  { id: 6, name: "Zero Two", type: "img", url: "/assets/anime/zero_two.gif", color: "#f43f5e", scale: 1.5, funAnim: "float" },
  { id: 7, name: "Mai Sakurajima", type: "img", url: "/assets/anime/mai.gif", color: "#a855f7", scale: 1.5, funAnim: "walk" },
  { id: 8, name: "Kakashi", type: "img", url: "/assets/anime/kakashi.gif", color: "#64748b", scale: 1.5, funAnim: "walk" }
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
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

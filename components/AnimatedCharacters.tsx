"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Using reliable local Pokemon sprites as anime equivalents
const CHARACTERS = [
  { id: 1, name: "Pikachu", imgUrl: "/assets/anime/pikachu.gif", color: "#fee440", scale: 1.5 },
  { id: 2, name: "Charizard", imgUrl: "/assets/anime/charizard.gif", color: "#ff5a5f", scale: 1.5 },
  { id: 3, name: "Blastoise", imgUrl: "/assets/anime/blastoise.gif", color: "#00f5d4", scale: 1.5 },
  { id: 4, name: "Venusaur", imgUrl: "/assets/anime/venusaur.gif", color: "#4ade80", scale: 1.5 },
];

export default function AnimatedCharacters() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {CHARACTERS.map((char, index) => {
        // Generate random multi-directional paths
        const isLeftToRight = Math.random() > 0.5;
        const startX = isLeftToRight ? "-20vw" : "120vw";
        const endX = isLeftToRight ? "120vw" : "-20vw";

        // Keep them mostly in the lower half of the screen
        const startY = `${50 + Math.random() * 40}vh`;
        const midY1 = `${50 + Math.random() * 40}vh`;
        const midY2 = `${50 + Math.random() * 40}vh`;
        const endY = `${50 + Math.random() * 40}vh`;

        const duration = 15 + Math.random() * 15; // 15s to 30s duration
        const delay = index * 4;

        // Flip image horizontally if moving right to left
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
            className="pointer-events-none"
          >
            <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                 src={char.imgUrl}
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

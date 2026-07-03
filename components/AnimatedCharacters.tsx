"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Using simple emoji/character representations for the required cast
const CHARACTERS = [
  { id: 1, name: "Naruto", icon: "🦊", color: "#fee440" },
  { id: 2, name: "Zero Two", icon: "🦖", color: "#ff758f" },
  { id: 3, name: "Eren", icon: "🗡️", color: "#ff5a5f" },
  { id: 4, name: "Mai", icon: "🐰", color: "#00f5d4" },
  { id: 5, name: "Turbo Granny", icon: "👵💨", color: "#ffffff" },
  { id: 6, name: "Daijin", icon: "🐱", color: "#ffffff" },
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
        const startX = Math.random() > 0.5 ? "-10vw" : "110vw";
        const endX = startX === "-10vw" ? "110vw" : "-10vw";
        const startY = `${10 + Math.random() * 80}vh`;
        const midY1 = `${10 + Math.random() * 80}vh`;
        const midY2 = `${10 + Math.random() * 80}vh`;
        const endY = `${10 + Math.random() * 80}vh`;

        const duration = 20 + Math.random() * 20; // 20s to 40s duration
        const delay = index * 3;

        return (
          <motion.div
            key={char.id}
            initial={{ x: startX, y: startY, opacity: 0 }}
            animate={{
              x: [startX, startX === "-10vw" ? "50vw" : "50vw", endX],
              y: [startY, midY1, midY2, endY],
              opacity: [0, 1, 1, 0],
              rotate: [0, Math.random() * 45 - 22.5, Math.random() * -45 + 22.5, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              times: [0, 0.33, 0.66, 1]
            }}
            style={{
              position: 'absolute',
              textShadow: `0 0 10px ${char.color}`,
            }}
            className="text-2xl md:text-4xl drop-shadow-lg pointer-events-none"
          >
            {char.icon}
          </motion.div>
        );
      })}
    </div>
  );
}

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
        // Stagger their start times and random vertical positions
        const topPosition = 10 + Math.random() * 80; // 10% to 90%
        const duration = 15 + Math.random() * 10; // 15s to 25s crossing
        const delay = index * 2.5;

        return (
          <motion.div
            key={char.id}
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{
              x: ["-10vw", "110vw"],
              opacity: [0, 1, 1, 0],
              y: [0, -10, 0, 10, 0] // subtle bouncing
            }}
            transition={{
              x: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: duration,
                repeat: Infinity,
                times: [0, 0.1, 0.9, 1],
                delay: delay
              }
            }}
            style={{
              position: 'absolute',
              top: `${topPosition}%`,
              textShadow: `0 0 10px ${char.color}`
            }}
            className="text-2xl md:text-4xl drop-shadow-lg"
          >
            {char.icon}
          </motion.div>
        );
      })}
    </div>
  );
}

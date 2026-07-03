"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Actual anime character icons
const CHARACTERS = [
  { id: 1, name: "Naruto", imgUrl: "https://i.pinimg.com/originals/a0/62/77/a06277b049abdfbb05d8f6d62ccae3bb.gif", color: "#fee440" },
  { id: 2, name: "Zero Two", imgUrl: "https://i.pinimg.com/originals/ab/03/79/ab03792e3ca2cc9f928e1834e565bf5d.gif", color: "#ff758f" },
  { id: 3, name: "Eren", imgUrl: "https://media1.tenor.com/m/l_D6d2Y-r1EAAAAC/eren-eren-yeager.gif", color: "#ff5a5f" },
  { id: 4, name: "Mai", imgUrl: "https://i.pinimg.com/originals/74/46/78/74467882255740fcb64042898ff9058b.gif", color: "#00f5d4" },
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
            }}
            className="drop-shadow-lg pointer-events-none"
          >
            <img
               src={char.imgUrl}
               alt={char.name}
               className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
               style={{ filter: `drop-shadow(0 0 8px ${char.color})` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

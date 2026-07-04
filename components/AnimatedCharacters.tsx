"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CHARACTERS = [
  { id: 5, name: "Naruto", type: "img", url: "/assets/anime/naruto.gif?v=3", color: "#f97316", scale: 1.5, funAnim: "walk" },
  { id: 6, name: "Zero Two", type: "img", url: "/assets/anime/zero_two.gif?v=3", color: "#f43f5e", scale: 1.5, funAnim: "float" },
  { id: 7, name: "Mai Sakurajima", type: "img", url: "/assets/anime/mai.gif?v=3", color: "#a855f7", scale: 1.5, funAnim: "walk" },
  { id: 8, name: "Kakashi", type: "img", url: "/assets/anime/kakashi.gif?v=3", color: "#64748b", scale: 1.5, funAnim: "walk" },
];

export default function AnimatedCharacters() {
  const [mounted, setMounted] = useState(false);
  const [characterPaths, setCharacterPaths] = useState<any[]>([]);

  useEffect(() => {
    // Generate paths on mount to avoid hydration mismatch and keep values stable
    const paths = CHARACTERS.map(() => {
      const isLeftToRight = Math.random() > 0.5;
      return {
        isLeftToRight,
        startX: isLeftToRight ? "-20vw" : "120vw",
        endX: isLeftToRight ? "120vw" : "-20vw",
        startY: `${10 + Math.random() * 80}vh`,
        endY: `${10 + Math.random() * 80}vh`,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 3,
      };
    });
    setCharacterPaths(paths);
    setMounted(true);
  }, []);

  if (!mounted || characterPaths.length === 0) return null;

  const getFunAnimation = (type: string) => {
    switch (type) {
      case "float":
        return { y: [0, -15, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
      case "walk":
      default:
        return { y: [0, -8, 0], rotate: [-5, 5, -5], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {CHARACTERS.map((char, index) => {
        const path = characterPaths[index];
        const scaleX = path.isLeftToRight ? 1 : -1;

        return (
          <motion.div
            key={char.id}
            initial={{ x: path.startX, y: path.startY }}
            animate={{
              x: [path.startX, path.endX],
              y: [path.startY, path.endY],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
              delay: path.delay,
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
                     width: '120px',
                     height: '120px'
                   }}
                />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

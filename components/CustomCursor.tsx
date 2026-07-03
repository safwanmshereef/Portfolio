"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button" || target.closest("button") || target.closest("a") || target.classList.contains("interactive")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-neon-teal rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "#ff5a5f" : "#00f5d4",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <motion.div
          className="w-1 h-1 bg-neon-teal rounded-full"
          animate={{
             backgroundColor: isHovering ? "#ff5a5f" : "#00f5d4"
          }}
        />
        {/* Crosshair lines */}
        {isHovering && (
          <>
            <div className="absolute top-1/2 left-[-10px] w-2 h-[2px] bg-sunset-orange -translate-y-1/2" />
            <div className="absolute top-1/2 right-[-10px] w-2 h-[2px] bg-sunset-orange -translate-y-1/2" />
            <div className="absolute left-1/2 top-[-10px] h-2 w-[2px] bg-sunset-orange -translate-x-1/2" />
            <div className="absolute left-1/2 bottom-[-10px] h-2 w-[2px] bg-sunset-orange -translate-x-1/2" />
          </>
        )}
      </motion.div>
    </>
  );
}
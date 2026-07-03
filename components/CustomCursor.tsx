"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth interpolation
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0) scale(${isHovering ? 1.5 : 1})`;
        cursorRef.current.style.borderColor = isHovering ? "#ff5a5f" : "#00f5d4";
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    animateCursor();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-neon-teal rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference transition-colors duration-200"
        style={{ willChange: "transform" }}
      >
        <div
          ref={dotRef}
          className={`w-1 h-1 rounded-full transition-colors duration-200 ${isHovering ? "bg-[#ff5a5f]" : "bg-neon-teal"}`}
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
      </div>
    </>
  );
}

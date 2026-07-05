"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const animateCursor = () => {
      // Smooth interpolation
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      if (cursorRef.current) {
        const hoverActive = cursorRef.current.dataset.hovering === "true";
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px, 0) scale(${hoverActive ? 1.5 : 1})`;
        cursorRef.current.style.borderColor = hoverActive ? "#ff5a5f" : "#00f5d4";
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
  }, []); // Run only once

  return (
    <>
      <div
        ref={cursorRef}
        data-hovering={isHovering}
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RefreshCw, Trophy, Gamepad2 } from "lucide-react";

const GRAVITY = 1.2;
const JUMP_VELOCITY = 18;
const OBSTACLE_SPEED = 6;
const GROUND_LEVEL = 40;
const CHAR_LEFT = 50;
const CHAR_WIDTH = 50;
const CHAR_HEIGHT = 60;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;

export default function AnimeMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const obstaclesContainerRef = useRef<HTMLDivElement>(null);

  // Physics state
  const charY = useRef(0);
  const charVy = useRef(0);
  const isJumping = useRef(false);
  const obstacles = useRef<{ id: number; left: number }[]>([]);
  const animationRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const lastTime = useRef<number>(0);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;

    charY.current = 0;
    charVy.current = 0;
    isJumping.current = false;
    obstacles.current = [];

    if (obstaclesContainerRef.current) {
        obstaclesContainerRef.current.innerHTML = '';
    }

    if (characterRef.current) {
        characterRef.current.style.bottom = `${GROUND_LEVEL}px`;
        characterRef.current.style.transform = 'rotate(0deg)';
    }

    lastTime.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  const jump = useCallback(() => {
    if (isJumping.current || !isPlaying || gameOver) return;
    isJumping.current = true;
    charVy.current = JUMP_VELOCITY;
  }, [isPlaying, gameOver]);

  // Main Game Loop using requestAnimationFrame for smooth 60FPS
  const gameLoop = (time: number) => {
    if (gameOver) return;

    // Fixed timestep or delta time can be used, we'll use a simple approach
    // Update Character Physics
    if (isJumping.current) {
      charVy.current -= GRAVITY;
      charY.current += charVy.current;

      if (charY.current <= 0) {
        charY.current = 0;
        charVy.current = 0;
        isJumping.current = false;
      }
    }

    // Update Character DOM
    if (characterRef.current) {
      characterRef.current.style.bottom = `${GROUND_LEVEL + charY.current}px`;
      characterRef.current.style.transform = charY.current > 0 ? 'rotate(-10deg)' : 'rotate(0deg)';
    }

    // Container width for dynamic spawning
    const containerWidth = containerRef.current?.clientWidth || 800;

    // Spawn Obstacles
    if (Math.random() < 0.02) {
      const lastObs = obstacles.current[obstacles.current.length - 1];
      // Ensure enough gap between obstacles, especially on mobile
      const minGap = containerWidth < 600 ? 300 : 400;

      if (!lastObs || (containerWidth - lastObs.left) > minGap) {
        const id = Date.now();
        obstacles.current.push({ id, left: containerWidth });

        // Create DOM element for new obstacle
        if (obstaclesContainerRef.current) {
            const el = document.createElement('div');
            el.id = `obs-${id}`;
            el.className = "absolute z-10 flex flex-col items-center justify-end animate-spin-slow";
            el.style.left = `${containerWidth}px`;
            el.style.bottom = `${GROUND_LEVEL}px`;
            el.style.width = `${OBSTACLE_WIDTH}px`;
            el.style.height = `${OBSTACLE_HEIGHT}px`;

            const img = document.createElement('img');
            img.src = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Shuriken.svg";
            img.className = "w-8 h-8 filter drop-shadow-[0_0_5px_#fff]";
            el.appendChild(img);

            obstaclesContainerRef.current.appendChild(el);
        }
      }
    }

    // Update Obstacles and check collision
    let currentScore = scoreRef.current;

    for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.left -= OBSTACLE_SPEED;

        // Update DOM
        const el = document.getElementById(`obs-${obs.id}`);
        if (el) {
            el.style.left = `${obs.left}px`;
        }

        // Collision Logic
        const charRight = CHAR_LEFT + CHAR_WIDTH - 10; // slightly smaller hitbox
        const charLeftHitbox = CHAR_LEFT + 10;
        const obsRight = obs.left + OBSTACLE_WIDTH - 10;
        const obsLeftHitbox = obs.left + 10;

        // Check horizontal overlap
        if (obsLeftHitbox < charRight && obsRight > charLeftHitbox) {
            // Check vertical overlap (character bottom is charY.current)
            if (charY.current < OBSTACLE_HEIGHT - 10) {
                endGame();
                return;
            }
        }

        // Remove off-screen obstacles
        if (obs.left < -50) {
            obstacles.current.splice(i, 1);
            if (el) el.remove();
        }
    }

    // Score update
    if (time - lastTime.current > 100) {
        currentScore += 1;
        scoreRef.current = currentScore;
        setScore(currentScore);
        lastTime.current = time;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
      setGameOver(true);
      setIsPlaying(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  useEffect(() => {
      return () => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
  }, []);

  return (
    <div
        ref={containerRef}
        className="w-full max-w-4xl mx-auto my-32 relative border-8 border-sunset-orange/50 rounded-lg overflow-hidden h-[400px] bg-[#0d1117] shadow-[0_0_40px_rgba(249,115,22,0.3)] interactive select-none touch-none"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-spin-slow {
            animation: spin 0.5s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}} />

      {/* Title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4 text-center w-full z-30 pointer-events-none">
         <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange via-radiant-gold to-sunset-orange animate-pulse drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] uppercase tracking-widest">
            Shinobi Run
         </h2>
      </div>

      {/* Dynamic Background Parallax */}
      <div className="absolute inset-0 overflow-hidden opacity-80 pointer-events-none">
         <div className={`absolute bottom-0 w-[200%] h-full flex ${isPlaying && !gameOver ? 'animate-[slide_10s_linear_infinite]' : ''}`}>
             <div className="w-1/2 h-full flex items-center justify-center opacity-80" style={{ backgroundImage: "url('/assets/anime/konoha.jpg')", backgroundSize: 'cover', backgroundPosition: 'bottom' }}></div>
             <div className="w-1/2 h-full flex items-center justify-center opacity-80" style={{ backgroundImage: "url('/assets/anime/konoha.jpg')", backgroundSize: 'cover', backgroundPosition: 'bottom' }}></div>
         </div>
         <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 w-full h-[40px] bg-[#3e2723] border-t-4 border-[#5d4037] shadow-[0_-5px_15px_rgba(0,0,0,0.5)] pointer-events-none" />

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 z-20 backdrop-blur-sm">
          <Gamepad2 size={64} className="text-sunset-orange mb-4" />
          <h3 className="font-display font-bold text-3xl uppercase mb-2 text-white shadow-glow text-center">Anime Platformer</h3>
          <p className="font-mono text-sm text-cream mb-8 text-center px-8 hidden md:block">Press <span className="text-radiant-gold">SPACEBAR</span> or <span className="text-radiant-gold">UP ARROW</span> to jump.<br/>Tap to play.</p>
          <p className="font-mono text-sm text-cream mb-8 text-center px-8 md:hidden">Tap anywhere to jump.<br/>Tap to play.</p>
          <button onClick={startGame} className="flex items-center space-x-2 bg-sunset-orange text-white px-8 py-4 font-bold uppercase tracking-wider interactive hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.5)] z-30">
            <Play size={20} /> <span>Start Run</span>
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/90 z-20">
          <Trophy size={48} className="text-radiant-gold mb-4" />
          <h3 className="font-display font-bold text-2xl uppercase mb-2 text-sunset-orange">Game Over!</h3>
          <p className="font-mono text-lg text-cream mb-6">Score: {score}</p>
          <button onClick={startGame} className="flex items-center space-x-2 border-2 border-sunset-orange text-sunset-orange px-6 py-3 font-bold uppercase tracking-wider interactive hover:bg-sunset-orange/10">
            <RefreshCw size={16} /> <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Score */}
      {(isPlaying || gameOver) && (
        <div className="absolute top-4 right-4 z-10 font-mono font-bold text-radiant-gold text-2xl bg-ink/50 px-4 py-2 rounded border border-radiant-gold/30">
          {score}
        </div>
      )}

      {/* Click/Touch overlay for mobile jump */}
      {isPlaying && !gameOver && (
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onPointerDown={(e) => {
                e.preventDefault();
                jump();
            }}
          />
      )}

      {/* Obstacles Container (Managed manually for performance) */}
      <div ref={obstaclesContainerRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Character */}
      <div
        ref={characterRef}
        className="absolute z-10 pointer-events-none"
        style={{
            left: `${CHAR_LEFT}px`,
            bottom: `${GROUND_LEVEL}px`,
            width: `${CHAR_WIDTH}px`,
            height: `${CHAR_HEIGHT}px`
        }}
      >
        <img
            src="/assets/anime/naruto.gif"
            alt="Naruto Runner"
            className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_#f97316] ${isPlaying && !gameOver ? '' : 'grayscale opacity-50'}`}
        />
      </div>

    </div>
  );
}

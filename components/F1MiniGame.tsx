"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flag, Play, RefreshCw, Trophy } from "lucide-react";

export default function F1MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // 0: Left, 1: Middle, 2: Right
  const [carLane, setCarLane] = useState(1);
  const [obstacles, setObstacles] = useState<{ id: number, lane: number, top: number }[]>([]);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCarLane(1);
    setObstacles([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === "ArrowLeft" && carLane > 0) setCarLane(prev => prev - 1);
      if (e.key === "ArrowRight" && carLane < 2) setCarLane(prev => prev + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, carLane]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        setScore(s => s + 1);

        // Move obstacles down
        setObstacles(prev => {
          const updated = prev.map(obs => ({ ...obs, top: obs.top + 5 }));

          // Collision detection
          const collided = updated.some(obs => obs.top > 80 && obs.top < 100 && obs.lane === carLane);
          if (collided) {
            setGameOver(true);
          }

          // Filter out passed obstacles
          return updated.filter(obs => obs.top < 120);
        });

        // Spawn new obstacle randomly
        if (Math.random() < 0.05) {
          setObstacles(prev => [...prev, { id: Date.now(), lane: Math.floor(Math.random() * 3), top: -10 }]);
        }
      }, 50);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, carLane]);

  return (
    <div className="w-full max-w-2xl mx-auto my-32 relative border-8 border-ferrari rounded-lg overflow-hidden h-[600px] bg-[#111] shadow-[0_0_100px_rgba(225,6,0,0.8)] interactive ring-4 ring-radiant-gold transform hover:scale-[1.02] transition-transform duration-300">
      {/* Title above game to make it super noticeable */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4 text-center w-full z-30 pointer-events-none">
         <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-ferrari via-radiant-gold to-ferrari animate-pulse drop-shadow-[0_0_10px_rgba(225,6,0,0.8)] uppercase tracking-widest">
            F1 Reflex Challenge
         </h2>
      </div>
      {/* Background Track with Animation */}
      <div className={`absolute inset-0 flex justify-evenly opacity-30 ${isPlaying && !gameOver ? 'animate-[pulse_0.1s_ease-in-out_infinite]' : ''}`}>
        <div className="w-2 bg-white h-full border-x border-gray-400 border-dashed" />
        <div className="w-2 bg-white h-full border-x border-gray-400 border-dashed" />
      </div>

      {/* Track edges */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#ff0000,#ff0000_10px,#ffffff_10px,#ffffff_20px)]" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#ff0000,#ff0000_10px,#ffffff_10px,#ffffff_20px)]" />

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/90 z-20 backdrop-blur-sm">
          <Flag size={64} className="text-ferrari mb-4" />
          <h3 className="font-display font-bold text-3xl uppercase mb-2 text-white shadow-glow">F1 Grand Prix Module</h3>
          <p className="font-mono text-sm text-cream mb-8 text-center px-8">Use <span className="text-radiant-gold">Left/Right</span> arrows to dodge barriers.<br/>Drive like Hamilton, Verstappen, or Senna.</p>
          <button onClick={startGame} className="flex items-center space-x-2 bg-ferrari text-white px-8 py-4 font-bold uppercase tracking-wider interactive hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(225,6,0,0.5)]">
            <Play size={20} /> <span>Start Engine</span>
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/90 z-20">
          <Trophy size={48} className="text-radiant-gold mb-4" />
          <h3 className="font-display font-bold text-2xl uppercase mb-2 text-ferrari">Crash!</h3>
          <p className="font-mono text-lg text-cream mb-6">Score: {score}</p>
          <button onClick={startGame} className="flex items-center space-x-2 border-2 border-ferrari text-ferrari px-6 py-3 font-bold uppercase tracking-wider interactive hover:bg-ferrari/10">
            <RefreshCw size={16} /> <span>Restart Lap</span>
          </button>
        </div>
      )}

      {/* Score */}
      {isPlaying && (
        <div className="absolute top-4 right-4 z-10 font-mono font-bold text-radiant-gold text-xl bg-ink/50 px-3 py-1 rounded">
          {score}
        </div>
      )}

      {/* Obstacles */}
      {obstacles.map(obs => (
        <div
          key={obs.id}
          className="absolute w-1/3 flex justify-center"
          style={{
            left: `${obs.lane * 33.33}%`,
            top: `${obs.top}%`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="w-16 h-8 bg-[repeating-linear-gradient(45deg,#000000,#000000_10px,#ffcc00_10px,#ffcc00_20px)] border border-white shadow-[0_0_15px_rgba(255,204,0,0.5)] rounded-sm flex items-center justify-center"><span className="text-[8px] font-bold text-white bg-black/50 px-1">BARRIER</span></div>
        </div>
      ))}

      {/* Car */}
      <div
        className="absolute bottom-6 w-1/3 flex justify-center transition-all duration-150 ease-out z-10"
        style={{ left: `${carLane * 33.33}%` }}
      >
        {/* Real F1 Car Representation */}
        <div className="relative w-24 h-40 flex flex-col items-center justify-center filter drop-shadow-[0_0_15px_rgba(225,6,0,0.8)]">
           <svg viewBox="0 0 100 200" className="w-full h-full">
             {/* Front Wing */}
             <path d="M10 30 L90 30 L85 45 L15 45 Z" fill="#E32636" stroke="#111" strokeWidth="2"/>
             <path d="M20 25 L80 25 L80 30 L20 30 Z" fill="#111"/>

             {/* Nose/Chassis */}
             <path d="M45 45 L55 45 L65 110 L35 110 Z" fill="#E32636"/>

             {/* Front Wheels */}
             <rect x="5" y="35" width="15" height="40" rx="3" fill="#111"/>
             <rect x="80" y="35" width="15" height="40" rx="3" fill="#111"/>
             <line x1="20" y1="55" x2="40" y2="65" stroke="#333" strokeWidth="3"/>
             <line x1="80" y1="55" x2="60" y2="65" stroke="#333" strokeWidth="3"/>

             {/* Sidepods */}
             <path d="M25 100 L75 100 L80 150 L20 150 Z" fill="#E32636"/>
             <path d="M28 105 L35 105 L35 140 L28 140 Z" fill="#111"/>
             <path d="M72 105 L65 105 L65 140 L72 140 Z" fill="#111"/>

             {/* Halo & Cockpit */}
             <ellipse cx="50" cy="115" rx="8" ry="12" fill="#000"/>
             <path d="M40 110 L60 110 L50 95 Z" fill="none" stroke="#222" strokeWidth="3"/>

             {/* Rear Wheels */}
             <rect x="5" y="140" width="18" height="45" rx="3" fill="#111"/>
             <rect x="77" y="140" width="18" height="45" rx="3" fill="#111"/>

             {/* Rear Wing */}
             <path d="M25 180 L75 180 L75 195 L25 195 Z" fill="#E32636" stroke="#111" strokeWidth="2"/>
             <path d="M30 175 L70 175 L70 180 L30 180 Z" fill="#111"/>

             {/* Details (T-cam, sponsors) */}
             <rect x="48" y="80" width="4" height="10" fill="#FFFF00"/>
             <circle cx="50" cy="130" r="3" fill="#FFFF00"/>
           </svg>
        </div>
      </div>
    </div>
  );
}

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
    <div className="w-full max-w-md mx-auto mt-8 relative border-4 border-ferrari rounded-lg overflow-hidden h-[400px] bg-slate">
      {/* Background Track */}
      <div className="absolute inset-0 flex justify-evenly opacity-20">
        <div className="w-1 bg-white h-full" style={{ backgroundImage: 'var(--race-stripes)' }} />
        <div className="w-1 bg-white h-full" style={{ backgroundImage: 'var(--race-stripes)' }} />
      </div>

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 z-20">
          <Flag size={48} className="text-ferrari mb-4" />
          <h3 className="font-display font-bold text-xl uppercase mb-2">Grand Prix Override</h3>
          <p className="font-mono text-xs text-cream/70 mb-6 text-center px-8">Use Left/Right arrows to dodge barriers.<br/>Drive like Senna.</p>
          <button onClick={startGame} className="flex items-center space-x-2 bg-ferrari text-white px-6 py-3 font-bold uppercase tracking-wider interactive hover:bg-ferrari/80">
            <Play size={16} /> <span>Start Engine</span>
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
          <div className="w-12 h-4 bg-sunset-orange border-2 border-ink shadow-glow rounded-sm" />
        </div>
      ))}

      {/* Car */}
      <div
        className="absolute bottom-4 w-1/3 flex justify-center transition-all duration-100 ease-out z-10"
        style={{ left: `${carLane * 33.33}%` }}
      >
        <div className="w-10 h-16 bg-ferrari rounded-t-xl rounded-b-sm border-2 border-white relative shadow-[0_0_15px_#e10600]">
           {/* Simple F1 car representation */}
           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ink rounded-full" />
           <div className="absolute -left-2 top-4 w-2 h-6 bg-ink rounded" />
           <div className="absolute -right-2 top-4 w-2 h-6 bg-ink rounded" />
           <div className="absolute bottom-0 w-full h-2 bg-black" />
        </div>
      </div>
    </div>
  );
}

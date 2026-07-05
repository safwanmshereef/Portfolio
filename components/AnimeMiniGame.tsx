"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RefreshCw, Trophy, Gamepad2 } from "lucide-react";

export default function AnimeMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const [obstacles, setObstacles] = useState<{ id: number, left: number }[]>([]);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
  };

  const jump = () => {
    if (isJumping || !isPlaying || gameOver) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 500); // Jump duration
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, isJumping]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        setScore(s => s + 1);

        // Move obstacles left
        setObstacles(prev => {
          const updated = prev.map(obs => ({ ...obs, left: obs.left - 2 }));

          // Collision Detection
          // Character is fixed at left: 50px, width: 60px. Ground level is bottom: 0. Jump height brings bottom to ~100px.
          // Obstacle width is ~30px.
          const charLeft = 50;
          const charRight = 110;

          const collided = updated.some(obs => {
            const obsLeft = obs.left;
            const obsRight = obs.left + 30; // Approx obstacle width

            // If horizontally overlapping
            if (obsLeft < charRight && obsRight > charLeft) {
              // If not jumping high enough (bottom of character during jump > obstacle height)
              if (!isJumping) {
                setGameOver(true);
                return true;
              }
            }
            return false;
          });

          // Filter out passed obstacles
          return updated.filter(obs => obs.left > -50);
        });

        // Spawn new obstacle
        if (Math.random() < 0.02) {
          // Avoid spawning too close together
          setObstacles(prev => {
             const lastObs = prev[prev.length - 1];
             if (!lastObs || lastObs.left < 800) {
                 return [...prev, { id: Date.now(), left: 1000 }];
             }
             return prev;
          });
        }
      }, 20); // Fast loop
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, isJumping]);

  return (
    <div className="w-full max-w-4xl mx-auto my-32 relative border-8 border-sunset-orange/50 rounded-lg overflow-hidden h-[400px] bg-[#0d1117] shadow-[0_0_40px_rgba(249,115,22,0.3)] interactive select-none">

      {/* Title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4 text-center w-full z-30 pointer-events-none">
         <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange via-radiant-gold to-sunset-orange animate-pulse drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] uppercase tracking-widest">
            Shinobi Run
         </h2>
      </div>

      {/* Dynamic Background Parallax */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
         <div className={`absolute bottom-0 w-[200%] h-full flex ${isPlaying && !gameOver ? 'animate-[slide_10s_linear_infinite]' : ''}`}>
             <div className="w-1/2 h-full bg-[#1e293b] flex items-center justify-center opacity-30"><div className="w-full h-full border-[20px] border-[#334155] border-dashed rounded-[100px] transform scale-150" /></div>
             <div className="w-1/2 h-full bg-[#1e293b] flex items-center justify-center opacity-30"><div className="w-full h-full border-[20px] border-[#334155] border-dashed rounded-[100px] transform scale-150" /></div>
         </div>
         {/* Overlay to ensure text readability */}
         <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 w-full h-[40px] bg-[#3e2723] border-t-4 border-[#5d4037] shadow-[0_-5px_15px_rgba(0,0,0,0.5)]" />

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 z-20 backdrop-blur-sm">
          <Gamepad2 size={64} className="text-sunset-orange mb-4" />
          <h3 className="font-display font-bold text-3xl uppercase mb-2 text-white shadow-glow">Anime Platformer</h3>
          <p className="font-mono text-sm text-cream mb-8 text-center px-8">Press <span className="text-radiant-gold">SPACEBAR</span> or <span className="text-radiant-gold">UP ARROW</span> to jump over obstacles.<br/>Tap to play.</p>
          <button onClick={startGame} className="flex items-center space-x-2 bg-sunset-orange text-white px-8 py-4 font-bold uppercase tracking-wider interactive hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.5)]">
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
      {isPlaying && (
        <div className="absolute top-4 right-4 z-10 font-mono font-bold text-radiant-gold text-2xl bg-ink/50 px-4 py-2 rounded border border-radiant-gold/30">
          {score}
        </div>
      )}

      {/* Click overlay for mobile jump */}
      {isPlaying && !gameOver && (
          <div className="absolute inset-0 z-10" onClick={jump} />
      )}

      {/* Obstacles */}
      {obstacles.map(obs => (
        <div
          key={obs.id}
          className="absolute bottom-[40px] z-10 flex flex-col items-center justify-end"
          style={{
            left: `${obs.left}px`,
            width: '40px',
            height: '40px',
          }}
        >
          {/* Shuriken style obstacle */}
          <motion.div
             animate={{ rotate: isPlaying && !gameOver ? 360 : 0 }}
             transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
             className="w-10 h-10 relative flex items-center justify-center"
          >
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Shuriken.svg" alt="Shuriken" className="w-8 h-8 filter drop-shadow-[0_0_5px_#fff]" />
          </motion.div>
        </div>
      ))}

      {/* Character (Naruto Sprite representation) */}
      <div
        ref={characterRef}
        className="absolute w-[60px] h-[60px] z-10"
        style={{
            left: '50px',
            bottom: isJumping ? '140px' : '40px', // Jump height
            transition: isJumping ? 'bottom 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'bottom 0.2s cubic-bezier(0.8, 0.2, 0.8, 1)'
        }}
      >
        <img
            src="/assets/anime/naruto.gif"
            alt="Naruto Runner"
            className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_#f97316] ${isPlaying && !gameOver ? '' : 'grayscale opacity-50'}`}
            style={{ transform: isJumping ? 'rotate(-10deg)' : 'rotate(0)' }}
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}

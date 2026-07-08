"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, MapPin, Gamepad2, Skull, PlaySquare } from "lucide-react";
import F1MiniGame from "./F1MiniGame";

export default function Lifestyle() {
  const [showGame, setShowGame] = useState(false);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-24 relative border-t-2 border-slate/50 min-h-screen">
      <div className="mb-16 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-bold uppercase tracking-widest flex items-center space-x-4">
            <Coffee className="text-cherry-pink" />
            <span>The Filler Episodes</span>
          </h2>
          <p className="font-mono text-cream/50 mt-2">Lifestyle, Culture & Otaku Core.</p>
        </div>

        {/* Hidden Trigger */}
        <button
          onClick={() => setShowGame(!showGame)}
          className="text-slate hover:text-ferrari interactive transition-colors duration-500"
          title="Grand Prix Override"
        >
          <Skull size={32} />
        </button>
      </div>

      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-16 overflow-hidden"
          >
            <F1MiniGame />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* The Otaku Matrix */}
        <div className="manga-panel p-6">
           <h3 className="font-display font-bold text-xl uppercase mb-6 flex items-center space-x-2 text-cherry-pink">
             <Gamepad2 size={20} /> <span>The Otaku Matrix</span>
           </h3>
           <div className="space-y-4">
             <div>
                <p className="font-mono text-xs text-cream/50 mb-1">Top-Tier Series</p>
                <div className="flex flex-wrap gap-2">
                   {["Naruto", "Attack on Titan", "SAO", "Darling in the Franxx", "Your Name", "Dandadan", "Solo Leveling"].map(anime => (
                     <span key={anime} className="px-2 py-1 bg-slate text-xs font-mono rounded">{anime}</span>
                   ))}
                </div>
             </div>
             <p className="text-sm text-cream/80">Active collector of physical manga tankōbon volumes and premium character action figures. Aesthetic affinity for Shonen and Cyberpunk layouts.</p>
           </div>
        </div>

        {/* Travel Logs */}
        <div className="manga-panel p-6">
           <h3 className="font-display font-bold text-xl uppercase mb-6 flex items-center space-x-2 text-neon-teal">
             <MapPin size={20} /> <span>Explorer Quests</span>
           </h3>
           <ul className="space-y-4 text-sm text-cream/80 border-l border-neon-teal/30 pl-4 relative">
              <li className="relative">
                <span className="absolute -left-5 top-1.5 w-2 h-2 bg-neon-teal rounded-full shadow-glow-teal" />
                <span className="font-bold text-cream">Kerala Circuits:</span> Coastal hopping in Kochi, backwaters in Alappuzha, high-altitude trekking in Vagamon & Devikulam.
              </li>
              <li className="relative">
                <span className="absolute -left-5 top-1.5 w-2 h-2 bg-neon-teal/50 rounded-full" />
                <span className="font-bold text-cream">Tamil Nadu Expeditions:</span> Alpine mapping through Ooty.
              </li>
              <li className="relative">
                <span className="absolute -left-5 top-1.5 w-2 h-2 bg-neon-teal/50 rounded-full" />
                <span className="font-bold text-cream">Karnataka Explorations:</span> Urban tech navigation across Bangalore and coastal village expeditions in Gundmi Village.
              </li>
           </ul>
        </div>

        {/* Culinary Inventory */}
        <div className="manga-panel p-6">
           <h3 className="font-display font-bold text-xl uppercase mb-6 flex items-center space-x-2 text-radiant-gold">
             <Coffee size={20} /> <span>Culinary Inventory</span>
           </h3>
           <div className="space-y-4 text-sm text-cream/80">
              <p><span className="font-bold text-cream">Gourmet & Street:</span> Loaded fries, gourmet double-patty chicken burgers, cheese rumali shawarmas, Kothuporota.</p>
              <p><span className="font-bold text-cream">Global:</span> Swedish-style meatballs, Tibetan momos, Japanese Udon and ramen.</p>
              <p><span className="font-bold text-cream">Regional:</span> Thalasserry style biriyani, traditional Kerala fish curry.</p>
              <div className="mt-4 pt-4 border-t border-slate">
                <p className="font-mono text-xs text-cream/50">Debugging Assistant: Lyra (Pet Cat) 🐈</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

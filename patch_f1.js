const fs = require('fs');
const filePath = 'components/F1MiniGame.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The F1 game seems to already have some F1 elements (it was built to be an F1 game in a previous patch, judging by the "ferrari" classes and "F1 Reflex Challenge" text), but the user requested: "in the racing game, its hard to find out the game so make it noticeable, also instead of that box car can you add f1 car".
// The current car is drawn using CSS shapes. We can replace it with a real top-down F1 car image, and make the container stand out more.

const oldCarBlock = `{/* Improved F1 Car Representation */}
        <div className="relative w-16 h-28 flex flex-col items-center">
           {/* Front Wing */}
           <div className="w-14 h-3 bg-black rounded-sm border-b-2 border-ferrari shadow-[0_0_10px_#e10600]" />
           {/* Nose */}
           <div className="w-4 h-8 bg-ferrari" />
           {/* Cockpit & Halo */}
           <div className="w-8 h-10 bg-ferrari rounded-t-full relative flex justify-center border-x-2 border-white">
              <div className="absolute top-2 w-4 h-4 bg-black rounded-full" /> {/* Driver Helmet */}
              <div className="absolute top-1 w-6 h-6 border border-gray-400 rounded-t-full rounded-b-none pointer-events-none" /> {/* Halo */}
           </div>
           {/* Sidepods */}
           <div className="absolute top-[40px] w-14 h-10 flex justify-between">
              <div className="w-3 h-full bg-red-800 rounded-l" />
              <div className="w-3 h-full bg-red-800 rounded-r" />
           </div>
           {/* Wheels */}
           <div className="absolute top-2 -left-1 w-2 h-6 bg-black rounded-sm" />
           <div className="absolute top-2 -right-1 w-2 h-6 bg-black rounded-sm" />
           <div className="absolute bottom-2 -left-1 w-3 h-8 bg-black rounded-sm" />
           <div className="absolute bottom-2 -right-1 w-3 h-8 bg-black rounded-sm" />
           {/* Rear Wing */}
           <div className="w-12 h-4 bg-black rounded-sm mt-auto border-t border-ferrari" />
        </div>`;

const newCarBlock = `{/* Real F1 Car Representation */}
        <div className="relative w-20 h-32 flex flex-col items-center justify-center filter drop-shadow-[0_0_10px_#e10600]">
           <img src="https://www.pngmart.com/files/22/F1-Car-Top-View-PNG.png" alt="F1 Car" className="w-full h-full object-contain -rotate-90" />
        </div>`;

content = content.replace(oldCarBlock, newCarBlock);

const trackBlock = `border-8 border-ferrari rounded-lg overflow-hidden h-[600px] bg-[#1a1a1a] shadow-[0_0_50px_rgba(225,6,0,0.4)] interactive`;
const newTrackBlock = `border-8 border-ferrari rounded-lg overflow-hidden h-[600px] bg-[#111] shadow-[0_0_100px_rgba(225,6,0,0.8)] interactive ring-4 ring-radiant-gold transform hover:scale-[1.02] transition-transform duration-300`;
content = content.replace(trackBlock, newTrackBlock);


fs.writeFileSync(filePath, content);
console.log("Patched F1 game");

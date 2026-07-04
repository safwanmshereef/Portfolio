const fs = require('fs');
const file = 'components/F1MiniGame.tsx';
let content = fs.readFileSync(file, 'utf8');

// The original obstacle is: <div className="w-12 h-4 bg-sunset-orange border-2 border-ink shadow-glow rounded-sm" />
// We want to make it look slightly more like a track barrier or tire bundle.
content = content.replace(
  /<div className="w-12 h-4 bg-sunset-orange border-2 border-ink shadow-glow rounded-sm" \/>/g,
  `<div className="w-16 h-8 bg-[repeating-linear-gradient(45deg,#000000,#000000_10px,#ffcc00_10px,#ffcc00_20px)] border border-white shadow-[0_0_15px_rgba(255,204,0,0.5)] rounded-sm flex items-center justify-center"><span className="text-[8px] font-bold text-white bg-black/50 px-1">BARRIER</span></div>`
);

fs.writeFileSync(file, content);
console.log('F1 Game updated');

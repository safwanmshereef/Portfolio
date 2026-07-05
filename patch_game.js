const fs = require('fs');

const bgPath = 'public/assets/anime/konoha_bg.jpg';
// We'll just use an external URL for the background to make it beautiful and simple, or set up a specific gradient/image pattern.
// Let's modify AnimeMiniGame.tsx

const filePath = 'components/AnimeMiniGame.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update background to hidden leaf style
const bgReplacement = `{/* Dynamic Background Parallax */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
         <div className={\`absolute bottom-0 w-[200%] h-full flex \${isPlaying && !gameOver ? 'animate-[slide_10s_linear_infinite]' : ''}\`}>
             <div className="w-1/2 h-full bg-[url('https://wallpapers.com/images/hd/hidden-leaf-village-1920-x-1080-wallpaper-xixl35p6305a4wta.jpg')] bg-cover bg-center" />
             <div className="w-1/2 h-full bg-[url('https://wallpapers.com/images/hd/hidden-leaf-village-1920-x-1080-wallpaper-xixl35p6305a4wta.jpg')] bg-cover bg-center" />
         </div>
         {/* Overlay to ensure text readability */}
         <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 w-full h-[40px] bg-[#3e2723] border-t-4 border-[#5d4037] shadow-[0_-5px_15px_rgba(0,0,0,0.5)]" />`;

content = content.replace(/\{\/\* Dynamic Background Parallax \*\/\}(.|\n)*?border-t-4 border-sunset-orange" \/>/m, bgReplacement);

// 2. Enhance Physics
// We need to implement proper jumping with velocity instead of CSS transition if we want a platformer feel.
// But since the structure uses `isJumping` with CSS transitions, let's just make the transition smoother and fix the collision logic.
const charReplacement = `{/* Character (Naruto Sprite representation) */}
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
            src="https://media.tenor.com/FwBfN6-zNKEAAAAj/naruto-run.gif"
            alt="Naruto Runner"
            className={\`w-full h-full object-contain filter drop-shadow-[0_0_8px_#f97316] \${isPlaying && !gameOver ? '' : 'grayscale opacity-50'}\`}
            style={{ transform: isJumping ? 'rotate(-10deg)' : 'rotate(0)' }}
        />
      </div>`;

content = content.replace(/\{\/\* Character \(Naruto Sprite representation\) \*\/\}(.|\n)*?<\/div>/m, charReplacement);

// 3. Shuriken sprite obstacle
const obsReplacement = `{/* Obstacles */}
      {obstacles.map(obs => (
        <div
          key={obs.id}
          className="absolute bottom-[40px] z-10 flex flex-col items-center"
          style={{
            left: \`\${obs.left}px\`,
            width: '40px',
            height: '40px',
          }}
        >
          {/* Shuriken style obstacle */}
          <motion.div
             animate={{ rotate: isPlaying && !gameOver ? 360 : 0 }}
             transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
             className="w-full h-full"
          >
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Shuriken.svg" alt="Shuriken" className="w-full h-full filter drop-shadow-[0_0_5px_#000]" />
          </motion.div>
        </div>
      ))}`;

content = content.replace(/\{\/\* Obstacles \*\/\}(.|\n)*?}\)/m, obsReplacement + '\n'); // Re-add the closing `)` implicitly eaten by match

fs.writeFileSync(filePath, content);
console.log("Patched game.");

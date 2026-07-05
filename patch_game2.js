const fs = require('fs');
const filePath = 'components/AnimeMiniGame.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldObsBlock = `{/* Obstacles */}
      {obstacles.map(obs => (
        <div
          key={obs.id}
          className="absolute bottom-[40px] z-10 flex flex-col items-center"
          style={{
            left: \`\${obs.left}px\`,
            width: '30px',
            height: '40px',
          }}
        >
          {/* Shuriken style obstacle */}
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
             className="w-8 h-8 relative"
          >
             <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 bg-neon-teal shadow-[0_0_10px_#00f5d4]" />
             <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-neon-teal shadow-[0_0_10px_#00f5d4]" />
             <div className="absolute inset-0 m-auto w-3 h-3 bg-ink border-2 border-neon-teal rounded-full" />
          </motion.div>
        </div>
      ))}`;

const newObsBlock = `{/* Obstacles */}
      {obstacles.map(obs => (
        <div
          key={obs.id}
          className="absolute bottom-[40px] z-10 flex flex-col items-center justify-end"
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
             className="w-10 h-10 relative flex items-center justify-center"
          >
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Shuriken.svg" alt="Shuriken" className="w-8 h-8 filter drop-shadow-[0_0_5px_#fff]" />
          </motion.div>
        </div>
      ))}`;

content = content.replace(oldObsBlock, newObsBlock);
fs.writeFileSync(filePath, content);
console.log("Patched obstacles");

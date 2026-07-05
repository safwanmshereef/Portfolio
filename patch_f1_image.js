const fs = require('fs');
const filePath = 'components/F1MiniGame.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The rotate-90 might be wrong if the image is already vertical. Let's fix it by setting no rotation, or rotating appropriately based on typical assets.
// Let's use an image that is vertically aligned.
const newCarBlock2 = `{/* Real F1 Car Representation */}
        <div className="relative w-24 h-40 flex flex-col items-center justify-center filter drop-shadow-[0_0_15px_rgba(225,6,0,0.8)]">
           <img src="https://clipart-library.com/images_k/f1-car-transparent/f1-car-transparent-13.png" alt="F1 Car" className="w-full h-full object-contain -rotate-90" />
        </div>`;

content = content.replace(/\{\/\* Real F1 Car Representation \*\/\}[\s\S]*?<\/div>/m, newCarBlock2);
fs.writeFileSync(filePath, content);
console.log("Patched image");

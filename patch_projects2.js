const fs = require('fs');
const filePath = 'components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The replacement above might have failed if exact match didn't work. Let's do it safely.
if (!content.includes('Live Demo Link')) {
    content = content.replace(/>Live Demo</g, '>Live Demo Link<');
    fs.writeFileSync(filePath, content);
}

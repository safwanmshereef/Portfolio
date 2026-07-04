const fs = require('fs');

let content = fs.readFileSync('components/Projects.tsx', 'utf-8');

// I'll be more aggressive with removing the items by their exact IDs in the array objects
content = content.replace(/\{\s*id:\s*"nutri"[\s\S]*?\},/g, '');
content = content.replace(/\{\s*id:\s*"finance"[\s\S]*?\},/g, '');

fs.writeFileSync('components/Projects.tsx', content);

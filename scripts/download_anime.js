const https = require('https');
const fs = require('fs');
const path = require('path');

const chars = [
  { name: 'naruto.gif', url: 'https://media.tenor.com/E8jE_kXQeH8AAAAi/naruto-run.gif' },
  { name: 'kakashi.gif', url: 'https://media.tenor.com/7dZ_W-MhP9EAAAAi/kakashi-running.gif' },
  { name: 'zero_two.gif', url: 'https://media.tenor.com/bQyG3iC_H6oAAAAi/zero-two-dance.gif' },
  { name: 'mai.gif', url: 'https://media.tenor.com/6XJ-hCqL0Z4AAAAi/rascal-does-not-dream-of-bunny-girl-senpai-mai-sakurajima.gif' }
];

const dest = path.join(__dirname, '..', 'public', 'assets', 'anime');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

chars.forEach(char => {
  const filePath = path.join(dest, char.name);
  https.get(char.url, (res) => {
    const fileStream = fs.createWriteStream(filePath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${char.name}`);
    });
  });
});

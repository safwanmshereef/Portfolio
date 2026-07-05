const https = require('https');
const fs = require('fs');
const path = require('path');

const chars = [
  // Direct GIPHY media links
  { name: 'naruto.gif', url: 'https://media.giphy.com/media/JRlqKEzTIG1mE/giphy.gif' },
  { name: 'kakashi.gif', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTkwOGJiYWVmMzcxZjRhZDhhZmM2ZjE0ZTljMWQwNGE5Njc5Yzk2YSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/12CFOOvoC5J2eI/giphy.gif' },
  { name: 'zero_two.gif', url: 'https://media.giphy.com/media/c5k0oM4H1f1q8/giphy.gif' },
  { name: 'mai.gif', url: 'https://media.giphy.com/media/OQ7T6EIO37hF6/giphy.gif' }
];

const dest = path.join(__dirname, '..', 'public', 'assets', 'anime');

chars.forEach(char => {
  const filePath = path.join(dest, char.name);
  https.get(char.url, (res) => {

    // handle redirect if giphy sends a 301/302
    if(res.statusCode === 301 || res.statusCode === 302) {
      https.get(res.headers.location, (res2) => {
         const fileStream = fs.createWriteStream(filePath);
         res2.pipe(fileStream);
      });
    } else {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
    }

  });
});

const https = require('https');
const fs = require('fs');
const path = require('path');

// Direct media links that bypass tenor redirects if possible, or using an alternative
// Alternatively, let's just use some safe pixel art characters from a raw github repo or opengameart for testing,
// OR we fetch actual images from reliable urls using curl.

// Since tenor often returns 1x1 pixels if hotlinking isn't allowed, let's use some direct raw github paths for sprites or use standard curl to see if we get the real thing

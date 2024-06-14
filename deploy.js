const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the large media file
const mediaDir = path.join(__dirname, 'build', 'static', 'media');
const largeFile = path.join(mediaDir, 'vecteezy_purple-and-white-3d-technology-element-artificial_27989661.mp4');

// Check if the large file exists and delete it
if (fs.existsSync(largeFile)) {
    console.log(`Removing large file: ${largeFile}`);
    fs.unlinkSync(largeFile);
} else {
    console.log(`File not found: ${largeFile}`);
}

// Deploy to GitHub Pages
console.log('Deploying to GitHub Pages...');
execSync('gh-pages -d build', { stdio: 'inherit' });

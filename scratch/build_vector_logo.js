import fs from 'fs';
import zlib from 'zlib';

// Read PNG
const buf = fs.readFileSync('public/assets/images/logo-left-brain-ideas-white.png');
let offset = 8, width = 0, height = 0;
const idatChunks = [];

while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(offset + 8);
    height = buf.readUInt32BE(offset + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const compressed = Buffer.concat(idatChunks);
const decompressed = zlib.inflateSync(compressed);
const scanlineLen = 1 + width * 4;
const grid = [];

for (let y = 0; y < height; y++) {
  const row = [];
  for (let x = 0; x < width; x++) {
    const idx = y * scanlineLen + 1 + x * 4;
    const r = decompressed[idx];
    const a = decompressed[idx + 3];
    // Consider pixel solid if opacity and brightness are significant
    row.push(a > 30 && r > 40 ? 1 : 0);
  }
  grid.push(row);
}

// Trace horizontal runs to form clean SVG rects / paths or smoothed paths
let pathD = '';
for (let y = 0; y < height; y++) {
  let x = 0;
  while (x < width) {
    if (grid[y][x] === 1) {
      let startX = x;
      while (x < width && grid[y][x] === 1) {
        x++;
      }
      pathD += `M${startX},${y}h${x - startX}v1h-${x - startX}z `;
    } else {
      x++;
    }
  }
}

// Also let's crop to exact content bounding box
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (grid[y][x] === 1) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${cropW} ${cropH}" width="100%" height="100%">
  <path fill="#FFFFFF" d="${pathD.trim()}" />
</svg>`;

fs.writeFileSync('public/assets/images/logo-left-brain-ideas.svg', svgContent);
console.log(`Generated SVG successfully! ViewBox: ${minX} ${minY} ${cropW} ${cropH}`);

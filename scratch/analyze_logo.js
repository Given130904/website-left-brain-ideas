import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/assets/images/logo-left-brain-ideas-white.png');

// Verify PNG signature
if (buf.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
  console.error('Not a valid PNG');
  process.exit(1);
}

let offset = 8;
let width = 0, height = 0, bitDepth = 0, colorType = 0;
const idatChunks = [];

while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(offset + 8);
    height = buf.readUInt32BE(offset + 12);
    bitDepth = buf.readUInt8(offset + 16);
    colorType = buf.readUInt8(offset + 17);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

console.log(`Dimensions: ${width}x${height}, Bit depth: ${bitDepth}, Color type: ${colorType}`);

const compressed = Buffer.concat(idatChunks);
const decompressed = zlib.inflateSync(compressed);

// Color type 6 is RGBA (4 bytes per pixel)
const bpp = 4;
const scanlineLen = 1 + width * bpp;
const pixels = Buffer.alloc(width * height * 4);

let prevScanline = Buffer.alloc(width * bpp);
for (let y = 0; y < height; y++) {
  const filterType = decompressed[y * scanlineLen];
  const scanline = decompressed.subarray(y * scanlineLen + 1, (y + 1) * scanlineLen);
  const currentScanline = Buffer.alloc(width * bpp);

  for (let x = 0; x < width * bpp; x++) {
    let raw = scanline[x];
    const a = x >= bpp ? currentScanline[x - bpp] : 0;
    const b = prevScanline[x];
    const c = x >= bpp ? prevScanline[x - bpp] : 0;

    if (filterType === 1) raw = (raw + a) & 0xff;
    else if (filterType === 2) raw = (raw + b) & 0xff;
    else if (filterType === 3) raw = (raw + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      let pr = c;
      if (pa <= pb && pa <= pc) pr = a;
      else if (pb <= pc) pr = b;
      raw = (raw + pr) & 0xff;
    }
    currentScanline[x] = raw;
  }
  currentScanline.copy(pixels, y * width * bpp);
  prevScanline = currentScanline;
}

// Find bounding box of non-transparent content
let minX = width, maxX = 0, minY = height, maxY = 0;
let opaqueCount = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const alpha = pixels[(y * width + x) * 4 + 3];
    if (alpha > 20) {
      opaqueCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`Bounding box: X [${minX}, ${maxX}] (${maxX - minX + 1}px), Y [${minY}, ${maxY}] (${maxY - minY + 1}px)`);
console.log(`Opaque pixels: ${opaqueCount}`);

// Analyze row profiles to detect distinct elements (icon vs text lines)
const rowCounts = new Array(height).fill(0);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (pixels[(y * width + x) * 4 + 3] > 20) rowCounts[y]++;
  }
}

console.log('Row density (sampling every 10 rows):');
for (let y = minY; y <= maxY; y += 15) {
  const bar = '#'.repeat(Math.round(rowCounts[y] / 5));
  console.log(`Y=${y.toString().padStart(3)}: ${bar}`);
}

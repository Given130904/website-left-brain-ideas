import fs from 'fs';
import zlib from 'zlib';

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
const pixels = Buffer.alloc(width * height * 4);
let prevScanline = Buffer.alloc(width * 4);

for (let y = 0; y < height; y++) {
  const filterType = decompressed[y * scanlineLen];
  const scanline = decompressed.subarray(y * scanlineLen + 1, (y + 1) * scanlineLen);
  const currentScanline = Buffer.alloc(width * 4);

  for (let x = 0; x < width * 4; x++) {
    let raw = scanline[x];
    const a = x >= 4 ? currentScanline[x - 4] : 0;
    const b = prevScanline[x];
    const c = x >= 4 ? prevScanline[x - 4] : 0;

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
  currentScanline.copy(pixels, y * width * 4);
  prevScanline = currentScanline;
}

// Render ASCII art of the icon and text to see exact shapes in console
console.log('--- ICON PROFILE (Y 184 to 370) ---');
for (let y = 184; y <= 370; y += 4) {
  let line = '';
  for (let x = 88; x <= 320; x += 3) {
    const alpha = pixels[(y * width + x) * 4 + 3];
    line += alpha > 128 ? '█' : alpha > 30 ? '░' : ' ';
  }
  console.log(line);
}

console.log('--- TEXT PROFILE (Y 385 to 415) ---');
for (let y = 385; y <= 415; y += 1) {
  let line = '';
  for (let x = 88; x <= 320; x += 2) {
    const alpha = pixels[(y * width + x) * 4 + 3];
    line += alpha > 128 ? '█' : alpha > 30 ? '░' : ' ';
  }
  console.log(line);
}

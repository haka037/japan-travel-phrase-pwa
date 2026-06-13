import { mkdir, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const iconDir = path.join(root, "icons");

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])), 0);
  return Buffer.concat([length, name, data, crc]);
}

function insideRoundRect(x, y, left, top, width, height, radius) {
  const right = left + width;
  const bottom = top + height;
  if (x >= left + radius && x <= right - radius && y >= top && y <= bottom) return true;
  if (x >= left && x <= right && y >= top + radius && y <= bottom - radius) return true;
  const corners = [
    [left + radius, top + radius],
    [right - radius, top + radius],
    [left + radius, bottom - radius],
    [right - radius, bottom - radius],
  ];
  return corners.some(([cx, cy]) => (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2);
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function drawIcon(size) {
  const width = size;
  const height = size;
  const raw = Buffer.alloc((width * 3 + 1) * height);
  const colors = {
    bgTop: [15, 118, 110],
    bgBottom: [49, 91, 115],
    page: [255, 250, 242],
    line: [216, 223, 218],
    coral: [198, 74, 59],
    blue: [49, 91, 115],
    pale: [255, 222, 216],
  };

  const set = (x, y, rgb) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const offset = y * (width * 3 + 1) + 1 + x * 3;
    raw[offset] = rgb[0];
    raw[offset + 1] = rgb[1];
    raw[offset + 2] = rgb[2];
  };

  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 3 + 1)] = 0;
    const t = y / Math.max(1, height - 1);
    const bg = colors.bgTop.map((value, index) => mix(value, colors.bgBottom[index], t));
    for (let x = 0; x < width; x += 1) set(x, y, bg);
  }

  const sunCx = size * 0.74;
  const sunCy = size * 0.25;
  const sunR = size * 0.105;
  for (let y = Math.floor(sunCy - sunR); y <= Math.ceil(sunCy + sunR); y += 1) {
    for (let x = Math.floor(sunCx - sunR); x <= Math.ceil(sunCx + sunR); x += 1) {
      if ((x - sunCx) ** 2 + (y - sunCy) ** 2 <= sunR ** 2) set(x, y, colors.pale);
    }
  }

  const book = {
    left: size * 0.17,
    top: size * 0.25,
    width: size * 0.58,
    height: size * 0.5,
    radius: size * 0.065,
  };
  for (let y = Math.floor(book.top); y < Math.ceil(book.top + book.height); y += 1) {
    for (let x = Math.floor(book.left); x < Math.ceil(book.left + book.width); x += 1) {
      if (insideRoundRect(x, y, book.left, book.top, book.width, book.height, book.radius)) set(x, y, colors.page);
    }
  }

  const centerX = Math.round(book.left + book.width * 0.5);
  for (let y = Math.floor(book.top + size * 0.03); y < Math.ceil(book.top + book.height - size * 0.03); y += 1) {
    for (let x = centerX - Math.ceil(size * 0.01); x <= centerX + Math.ceil(size * 0.01); x += 1) set(x, y, colors.line);
  }

  const lineY = [0.37, 0.47, 0.57].map((value) => Math.round(size * value));
  for (const [index, y] of lineY.entries()) {
    const length = index === 2 ? size * 0.1 : size * 0.14;
    for (let yy = y - Math.round(size * 0.012); yy <= y + Math.round(size * 0.012); yy += 1) {
      for (let x = Math.round(size * 0.25); x <= Math.round(size * 0.25 + length); x += 1) set(x, yy, colors.blue);
    }
  }

  const markLeft = Math.round(size * 0.55);
  const markTop = Math.round(size * 0.38);
  const markWidth = Math.round(size * 0.13);
  const markHeight = Math.round(size * 0.22);
  for (let y = markTop; y < markTop + markHeight; y += 1) {
    for (let x = markLeft; x < markLeft + markWidth; x += 1) {
      const border = Math.min(x - markLeft, markLeft + markWidth - x, y - markTop, markTop + markHeight - y);
      if (border < size * 0.014 || Math.abs(y - (markTop + markHeight / 2)) < size * 0.012) set(x, y, colors.coral);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

await mkdir(iconDir, { recursive: true });
await writeFile(path.join(iconDir, "icon-192.png"), drawIcon(192));
await writeFile(path.join(iconDir, "icon-512.png"), drawIcon(512));
await writeFile(path.join(iconDir, "apple-touch-icon.png"), drawIcon(180));
console.log("Generated PNG icons.");

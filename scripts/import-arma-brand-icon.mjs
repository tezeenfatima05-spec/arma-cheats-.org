import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

for (const rel of ['dist/client/_redirects', 'dist/_redirects']) {
  const stale = path.join(process.cwd(), rel);
  if (!fs.existsSync(stale)) continue;
  fs.unlinkSync(stale);
  console.log(`[build] Removed stale ${rel} (pre-astro)`);
}

const root = process.cwd();
const source = path.join(root, 'assets', 'arma-reforger-brand.png');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(source)) {
  console.error('import-arma-brand-icon: source image not found at', source);
  process.exit(1);
}

/** Make near-black pixels transparent (logo shipped on black). */
async function logoWithTransparentBg() {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const threshold = 52;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

const transparent = await logoWithTransparentBg();
const masterPath = path.join(publicDir, 'arma-brand-logo.png');
await transparent.clone().toFile(masterPath);

const sizes = [
  { file: 'favicon-16.png', size: 16 },
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of sizes) {
  await transparent
    .clone()
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, file));
}

await transparent
  .clone()
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(publicDir, 'favicon.ico'));

await transparent
  .clone()
  .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 90 })
  .toFile(path.join(publicDir, 'logo.webp'));

console.log('ARMA brand icons written (transparent background):', masterPath);

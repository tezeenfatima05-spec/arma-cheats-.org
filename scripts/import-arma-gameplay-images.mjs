/**
 * Download ARMA REFORGER gameplay assets into public/images/gameplay/ (source webp).
 * Run: node scripts/import-arma-gameplay-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const outDir = path.join(process.cwd(), 'public', 'images', 'gameplay');

/** User-provided Supabase URLs → numbered local masters (optimize-images adds sizes). */
const ASSETS = [
  {
    file: 'hero-poster.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793619422445-1jrkla-levo-armareforger-1-visuals.webp',
  },
  {
    file: 'screenshot-1.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793619424186-isskfq-levo-armareforger-3-aimbot.webp',
  },
  {
    file: 'screenshot-2.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/986c4da2-dda6-40d4-9002-5802ae47beb5/1793624676495-yxw3on-zadeyo-armareforger-2-world.webp',
  },
  {
    file: 'screenshot-3.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/986c4da2-dda6-40d4-9002-5802ae47beb5/1793624679067-bfkn7d-zadeyo-armareforger-4-misc.webp',
  },
  {
    file: 'screenshot-4.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/ad4c79ec-795c-4c4f-b7f2-4126c15eb0d4/1794079135578-6hxzo6-arcane-arma-reforger-s2.webp',
  },
  {
    file: 'screenshot-5.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/ad4c79ec-795c-4c4f-b7f2-4126c15eb0d4/1794079125623-vnbv70-arcane-arma-reforger-s3.webp',
  },
  {
    file: 'screenshot-6.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/arma-reforger/ad4c79ec-795c-4c4f-b7f2-4126c15eb0d4/1794079176113-qwxugt-pussycat-arma-s2.webp',
  },
];

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} → HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

fs.mkdirSync(outDir, { recursive: true });

for (const { file, url } of ASSETS) {
  const dest = path.join(outDir, file);
  const buf = await download(url);
  fs.writeFileSync(dest, buf);
  console.log(`[ok] ${file} (${buf.length} bytes)`);
}

console.log('Done. Run: npm run optimize:images');

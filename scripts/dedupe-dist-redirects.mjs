import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';

/** Cloudflare rejects duplicate paths when Astro copies `_redirects` into dist/client. */
const staticDir = getStaticOutputDir();
const targets = [
  path.join(staticDir, '_redirects'),
  path.join(process.cwd(), 'dist', '_redirects'),
].filter((file) => fs.existsSync(file));

for (const file of targets) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const seen = new Set();
  const kept = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const rawPath = trimmed.split(/\s+/)[0] ?? '';
    const pathKey =
      rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
    if (seen.has(pathKey)) continue;
    seen.add(pathKey);
    kept.push(trimmed);
  }

  const next = `${kept.join('\n')}\n`;
  if (next !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, next, 'utf8');
    console.log(`Deduped _redirects (${kept.length} rules) → ${path.relative(process.cwd(), file)}`);
  }
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';
import { getStaticOutputDir } from './dist-output.mjs';

function redirectPathKey(line) {
  const rawPath = line.trim().split(/\s+/)[0] ?? '';
  if (rawPath.length > 1 && rawPath.endsWith('/')) return rawPath.slice(0, -1);
  return rawPath;
}

/** Single canonical _redirects for Workers (no duplicate /go paths). */
export function fixDistRedirects() {
  const staticDir = getStaticOutputDir();
  const target = path.join(staticDir, '_redirects');
  const checkoutLines = checkoutRedirectsFileLines();

  const existing = fs.existsSync(target)
    ? fs
        .readFileSync(target, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('/go/'))
    : [];

  const seen = new Set();
  const kept = [];
  for (const line of [...existing, ...checkoutLines]) {
    const trimmed = line.trim();
    const key = redirectPathKey(trimmed);
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(trimmed);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${kept.join('\n')}\n`, 'utf8');
  console.log(
    `Fixed _redirects: ${kept.length} rule(s) → ${path.relative(process.cwd(), target)}`,
  );
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  fixDistRedirects();
}

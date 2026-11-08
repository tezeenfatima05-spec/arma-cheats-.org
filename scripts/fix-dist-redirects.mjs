import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticOutputDir } from './dist-output.mjs';

/** Site 301s only — checkout uses public/go HTML pages (no /go in _redirects). */
const SITE_REDIRECTS = [
  '/contact/           /support/                                        301',
  '/cheats/            /products/arma-reforger-cheats/                  301',
  '/cheats/pro/        /products/arma-reforger-cheats/                  301',
  '/cheats/lite/       /products/arma-reforger-cheats/                  301',
  '/cheats/elite/      /products/arma-reforger-cheats/arma-reforger/    301',
  '/cheats/compare/    /blog/arma-reforger-aimbot-setup/                301',
];

function redirectPathKey(line) {
  const rawPath = line.trim().split(/\s+/)[0] ?? '';
  if (rawPath.length > 1 && rawPath.endsWith('/')) return rawPath.slice(0, -1);
  return rawPath;
}

export function fixDistRedirects() {
  const staticDir = getStaticOutputDir();
  const target = path.join(staticDir, '_redirects');
  const lines = [...SITE_REDIRECTS];

  const seen = new Set();
  for (const line of lines) {
    const key = redirectPathKey(line);
    if (seen.has(key)) {
      console.error(`[build] ERROR: duplicate _redirects rule for path ${key}`);
      process.exit(1);
    }
    seen.add(key);
  }

  const body = lines.join('\n') + '\n';
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body, 'utf8');

  if (/^\/go\//m.test(body)) {
    console.error('[build] ERROR: /go rules must not be in Workers _redirects');
    process.exit(1);
  }

  console.log(
    `[build] Wrote Workers _redirects: ${lines.length} rule(s) (no /go) → ${path.relative(process.cwd(), target)}`,
  );
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  fixDistRedirects();
}

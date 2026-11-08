import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';
import { getStaticOutputDir } from './dist-output.mjs';

/** Astro + Workers: legacy path redirects (301). */
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

/** Overwrite Workers _redirects — never merge cached duplicates. */
export function fixDistRedirects() {
  const staticDir = getStaticOutputDir();
  const target = path.join(staticDir, '_redirects');
  const lines = [...SITE_REDIRECTS, ...checkoutRedirectsFileLines()];

  const seen = new Set();
  for (const line of lines) {
    const key = redirectPathKey(line);
    if (seen.has(key)) {
      console.error(`[build] ERROR: duplicate _redirects rule for path ${key}`);
      process.exit(1);
    }
    seen.add(key);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  const stamp = `# workers-build ${Date.now()}\n`;
  fs.writeFileSync(target, `${stamp}${lines.join('\n')}\n`, 'utf8');

  const goRules = lines.filter((line) => line.trimStart().startsWith('/go/'));
  if (goRules.length !== 3) {
    console.error(`[build] ERROR: expected 3 /go rules, got ${goRules.length}`);
    process.exit(1);
  }

  console.log(
    `[build] Wrote Workers _redirects: ${lines.length} rule(s) → ${path.relative(process.cwd(), target)}`,
  );
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  fixDistRedirects();
}

/** Pre-build: drop cached duplicate _redirects (Workers Builds restores dist/). */
import fs from 'node:fs';
import path from 'node:path';
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';

for (const rel of ['dist/client/_redirects', 'dist/_redirects']) {
  const file = path.join(process.cwd(), rel);
  if (!fs.existsSync(file)) continue;
  fs.unlinkSync(file);
  console.log(`[build] Removed stale ${rel}`);
}

console.log(
  `[build] Checkout redirects: ${checkoutRedirectsFileLines().length} rule(s) (applied after astro build)`,
);

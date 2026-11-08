import fs from 'node:fs';
import path from 'node:path';
import { fixDistRedirects } from '../scripts/fix-dist-redirects.mjs';

function removeStaleDistRedirects() {
  for (const rel of ['dist/client/_redirects', 'dist/_redirects']) {
    const file = path.join(process.cwd(), rel);
    if (!fs.existsSync(file)) continue;
    fs.unlinkSync(file);
    console.log(`[build] Removed stale ${rel} (astro hook)`);
  }
}

/** Runs inside `astro build` so Wrangler cannot skip it when it overwrites package.json. */
export default function workersRedirectsIntegration() {
  return {
    name: '@site/workers-redirects',
    hooks: {
      'astro:build:start': () => {
        removeStaleDistRedirects();
      },
      'astro:build:done': () => {
        fixDistRedirects();
      },
    },
  };
}

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

for (const rel of ['dist/client/_redirects', 'dist/_redirects']) {
  const file = path.join(process.cwd(), rel);
  if (!fs.existsSync(file)) continue;
  fs.unlinkSync(file);
  console.log(`[build] Removed stale ${rel}`);
}

const isOrchestrator = process.env.WORKERS_FULL_BUILD === '1';

if (
  isOrchestrator &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  console.log('[build] Running full Workers build pipeline');
  const result = spawnSync(process.execPath, ['scripts/build-for-workers.mjs'], {
    stdio: 'inherit',
  });
  process.exit(result.status ?? 1);
}

console.log('[build] Checkout: /go/* → static HTML under public/go/ (not in _redirects)');

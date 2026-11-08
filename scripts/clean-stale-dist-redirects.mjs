import fs from 'node:fs';
import path from 'node:path';

/** Workers Builds restores `dist/` from cache; stale `_redirects` breaks deploy. */
const targets = [
  path.join(process.cwd(), 'dist', 'client', '_redirects'),
  path.join(process.cwd(), 'dist', '_redirects'),
];

let removed = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  fs.unlinkSync(file);
  removed += 1;
  console.log(`Removed stale ${path.relative(process.cwd(), file)}`);
}

if (removed === 0) {
  console.log('No stale dist/_redirects to remove.');
}

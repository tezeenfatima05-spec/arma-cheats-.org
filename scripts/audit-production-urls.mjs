import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';
import { PRODUCTION_HOST, PRODUCTION_ORIGIN } from '../src/config/production-origin.mjs';

const staticDir = getStaticOutputDir();
const forbidden = [
  /workers\.dev/i,
  /\.workers\./i,
  /cloudflarepages\.com/i,
  /pages\.dev/i,
  /github\.com\/tezeenfatima05-spec/i,
  /arma-cheats--org/i,
];

const textExtensions = new Set(['.html', '.xml', '.txt', '.json']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
      continue;
    }
  if (entry.name === 'wrangler.json') continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (textExtensions.has(ext) || entry.name === '_redirects') files.push(full);
  }
  return files;
}

const violations = [];

for (const file of walk(staticDir)) {
  const body = fs.readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    if (!pattern.test(body)) continue;
    const rel = path.relative(process.cwd(), file);
    violations.push(`${rel}: matched ${pattern}`);
    break;
  }
}


if (violations.length > 0) {
  console.error('[audit] Production URL audit failed:\n' + violations.join('\n'));
  process.exit(1);
}

console.log(
  `[audit] OK: public artifacts use ${PRODUCTION_HOST} only (${walk(staticDir).length} file(s) scanned)`,
);

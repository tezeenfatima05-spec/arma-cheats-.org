import fs from 'node:fs';
import path from 'node:path';
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';
import { getStaticOutputDir } from './dist-output.mjs';

/**
 * Workers rejects duplicate /go/* rules when `public/_redirects` merges with adapter output.
 * Write checkout rules once, post-build, into dist/client only.
 */
const staticDir = getStaticOutputDir();
const target = path.join(staticDir, '_redirects');
const checkoutLines = checkoutRedirectsFileLines();

let existing = [];
if (fs.existsSync(target)) {
  existing = fs
    .readFileSync(target, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('/go/'));
}

const body = `${[...existing, ...checkoutLines].join('\n')}\n`;
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, body, 'utf8');
console.log(`Wrote ${checkoutLines.length} checkout redirect(s) → ${path.relative(process.cwd(), target)}`);

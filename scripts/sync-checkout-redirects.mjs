import fs from 'node:fs';
import path from 'node:path';
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';

const target = path.join(process.cwd(), 'public', '_redirects');
const lines = checkoutRedirectsFileLines();
const body = `${lines.join('\n')}\n`;

if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== body) {
  fs.writeFileSync(target, body, 'utf8');
  console.log(`Wrote ${lines.length} checkout redirect(s) → public/_redirects`);
}

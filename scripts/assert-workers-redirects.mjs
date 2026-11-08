import fs from 'node:fs';
import path from 'node:path';

const redirectsPath = path.join(process.cwd(), 'dist', 'client', '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.error('[deploy] FATAL: missing dist/client/_redirects');
  process.exit(1);
}
const body = fs.readFileSync(redirectsPath, 'utf8');
if (/^\/go\//m.test(body)) {
  console.error('[deploy] FATAL: _redirects must not contain /go rules\n', body);
  process.exit(1);
}
const ruleLines = body
  .trim()
  .split('\n')
  .filter((line) => line.trim() && !line.trim().startsWith('#'));
if (ruleLines.length !== 6) {
  console.error(`[deploy] FATAL: expected 6 redirect rules, got ${ruleLines.length}`);
  process.exit(1);
}
console.log('[deploy] _redirects OK (6 rules, no /go)');

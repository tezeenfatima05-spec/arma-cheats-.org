import fs from 'node:fs';
import path from 'node:path';

export const WORKERS_REDIRECTS_BODY = `/contact/           /support/                                        301
/cheats/            /products/arma-reforger-cheats/                  301
/cheats/pro/        /products/arma-reforger-cheats/                  301
/cheats/lite/       /products/arma-reforger-cheats/                  301
/cheats/elite/      /products/arma-reforger-cheats/arma-reforger/    301
/cheats/compare/    /blog/arma-reforger-aimbot-setup/                301
`;

export function wipeDistOutput() {
  const dist = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(dist)) return;
  fs.rmSync(dist, { recursive: true, force: true });
  console.log('[build] Wiped dist/ (Workers Builds output cache)');
}

export function writeWorkersRedirectsOnly() {
  if (WORKERS_REDIRECTS_BODY.includes('/go/')) {
    console.error('[build] FATAL: template must not contain /go');
    process.exit(1);
  }

  const client = path.join(process.cwd(), 'dist', 'client');
  const body = `${WORKERS_REDIRECTS_BODY.trim()}\n`;
  fs.mkdirSync(client, { recursive: true });
  fs.writeFileSync(path.join(client, '_redirects'), body, 'utf8');

  const rootRedirect = path.join(process.cwd(), 'dist', '_redirects');
  if (fs.existsSync(rootRedirect)) fs.unlinkSync(rootRedirect);

  const read = fs.readFileSync(path.join(client, '_redirects'), 'utf8');
  if (/^\/go\//m.test(read)) {
    console.error('[build] FATAL: _redirects still has /go after write');
    process.exit(1);
  }
  console.log('[build] Workers _redirects locked: 6 rules, no /go paths');
}

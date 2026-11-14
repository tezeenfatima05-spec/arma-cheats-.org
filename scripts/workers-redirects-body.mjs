import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';

/** Cloudflare Workers Static Assets `_redirects` — never put /go checkout here. */
export const WORKERS_REDIRECTS_BODY = `# armacheats-redirects-v2
/contact/           /support/                                        301
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

  const staticDir = getStaticOutputDir();
  const body = `${WORKERS_REDIRECTS_BODY.trim()}\n`;
  fs.mkdirSync(staticDir, { recursive: true });
  const redirectsPath = path.join(staticDir, '_redirects');
  fs.writeFileSync(redirectsPath, body, 'utf8');

  // Legacy path when Astro emitted dist/client but site root was dist/
  const legacyClient = path.join(process.cwd(), 'dist', 'client', '_redirects');
  if (redirectsPath !== legacyClient && fs.existsSync(legacyClient)) {
    fs.unlinkSync(legacyClient);
  }

  const read = fs.readFileSync(redirectsPath, 'utf8');
  if (/^\/go\//m.test(read)) {
    console.error('[build] FATAL: _redirects still has /go after write');
    process.exit(1);
  }
  console.log('[build] Workers _redirects locked: 6 rules, no /go paths');
}

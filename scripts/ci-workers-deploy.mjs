/**
 * Cloudflare Workers Builds: use as deploy command
 *   npm run workers:deploy
 * Avoids `npx wrangler deploy` re-running `astro add cloudflare` and overwriting package.json.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeWorkersRedirectsOnly } from './workers-redirects-body.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

process.env.PUBLIC_SITE_ORIGIN = 'https://armacheats.org';

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, [path.join(root, 'scripts', 'build-for-workers.mjs')]);
writeWorkersRedirectsOnly();
run(process.execPath, [path.join(root, 'scripts', 'assert-workers-redirects.mjs')]);

const wranglerBin = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
run(process.execPath, [wranglerBin, 'deploy', '--config', path.join(root, 'wrangler.jsonc')]);
run(process.execPath, [path.join(root, 'scripts', 'validate-sitemap-live.mjs')]);

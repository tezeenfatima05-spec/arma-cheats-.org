import { spawnSync } from 'node:child_process';
import { wipeDistOutput } from './workers-redirects-body.mjs';
import './ensure-no-public-redirects.mjs';

wipeDistOutput();

console.log('[build] sync-checkout-redirects: wiped dist; checkout via public/go/ HTML only');

const go = spawnSync(process.execPath, ['scripts/write-go-redirect-pages.mjs'], {
  stdio: 'inherit',
});
if (go.status !== 0) process.exit(go.status ?? 1);

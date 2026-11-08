import { spawnSync } from 'node:child_process';
import { fixDistRedirects } from './fix-dist-redirects.mjs';

fixDistRedirects();

const wrangler = spawnSync('npx', ['wrangler', 'deploy', '--no-bundle'], {
  stdio: 'inherit',
  shell: true,
});

process.exit(wrangler.status === null ? 1 : wrangler.status);

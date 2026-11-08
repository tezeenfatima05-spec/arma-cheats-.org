import { spawnSync } from 'node:child_process';

/** Same pipeline Wrangler Workers Builds injects — keep in sync for overwrite resilience. */
const steps = [
  'node scripts/sync-checkout-redirects.mjs',
  'node scripts/import-arma-brand-icon.mjs',
  'node scripts/optimize-images.mjs',
  'npx astro build',
  'node scripts/prune-dist-images.mjs',
  'node scripts/finalize-sitemap.mjs',
  'node scripts/indexnow.mjs',
  'node scripts/fix-dist-redirects.mjs',
];

for (const step of steps) {
  console.log(`[build] >> ${step}`);
  const [bin, ...args] = step.split(' ');
  const result = spawnSync(bin, args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

import fs from 'node:fs';
import path from 'node:path';

/** Root Astro `dist` folder. */
export function getDistRoot() {
  return path.join(process.cwd(), 'dist');
}

/**
 * Static assets directory — `dist/` for plain static builds,
 * `dist/client/` when @astrojs/cloudflare rearranges output.
 */
export function getStaticOutputDir() {
  const dist = getDistRoot();
  const client = path.join(dist, 'client');
  if (fs.existsSync(client)) {
    const hasClientOutput =
      fs.existsSync(path.join(client, 'index.html')) ||
      fs.existsSync(path.join(client, 'sitemap-0.xml')) ||
      fs.existsSync(path.join(client, 'sitemap-index.xml'));
    if (hasClientOutput) return client;
  }
  return dist;
}

/** Locate generated sitemap-0.xml after astro build. */
export function findSitemap0Path() {
  const dist = getDistRoot();
  const candidates = [
    path.join(dist, 'sitemap-0.xml'),
    path.join(dist, 'client', 'sitemap-0.xml'),
  ];
  return candidates.find((file) => fs.existsSync(file)) ?? null;
}

import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';
import { fixDistRedirects } from './fix-dist-redirects.mjs';

function finishBuildRedirects() {
  fixDistRedirects();
}

const root = process.cwd();
const staticDir = getStaticOutputDir();
const key = process.env.INDEXNOW_KEY?.trim();
const host = process.env.INDEXNOW_HOST?.trim() || 'armacheats.org';

if (!key) {
  console.log('IndexNow: skipped (INDEXNOW_KEY not set).');
  finishBuildRedirects();
  process.exit(0);
}

const sitemapPath = path.join(staticDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.warn('IndexNow: dist/sitemap.xml missing — skipping ping.');
  finishBuildRedirects();
  process.exit(0);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).slice(0, 10000);

if (urlList.length === 0) {
  console.warn('IndexNow: no URLs found in sitemap.');
  finishBuildRedirects();
  process.exit(0);
}

const keyFile = path.join(staticDir, `${key}.txt`);
fs.writeFileSync(keyFile, key, 'utf8');

const payload = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList,
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (response.ok) {
  console.log(`IndexNow: submitted ${urlList.length} URL(s) (HTTP ${response.status}).`);
} else {
  const body = await response.text();
  console.warn(`IndexNow: ping failed HTTP ${response.status}: ${body.slice(0, 200)}`);
}

finishBuildRedirects();

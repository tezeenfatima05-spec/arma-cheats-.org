import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';
import { writeWorkersRedirectsOnly } from './workers-redirects-body.mjs';

const staticDir = getStaticOutputDir();
const key = process.env.INDEXNOW_KEY?.trim();
import { PRODUCTION_HOST } from '../src/config/production-origin.mjs';

const host = process.env.INDEXNOW_HOST?.trim() || PRODUCTION_HOST;

function finishWorkersRedirects() {
  writeWorkersRedirectsOnly();
}

if (!key) {
  console.log('IndexNow: skipped (INDEXNOW_KEY not set).');
  finishWorkersRedirects();
  process.exit(0);
}

const sitemapPath = path.join(staticDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.warn('IndexNow: dist/sitemap.xml missing — skipping ping.');
  finishWorkersRedirects();
  process.exit(0);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).slice(0, 10000);

if (urlList.length === 0) {
  console.warn('IndexNow: no URLs found in sitemap.');
  finishWorkersRedirects();
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

finishWorkersRedirects();

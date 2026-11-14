/**
 * Pre-deploy sitemap validation (runs at end of npm run build).
 */
import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';
import { PRODUCTION_ORIGIN } from '../src/config/production-origin.mjs';
import {
  collectCanonicalUrls,
  locToIndexHtml,
  validateRobotsSitemapLine,
  validateSitemapDocument,
} from './sitemap-validate-lib.mjs';

const staticDir = getStaticOutputDir();
const errors = [];

const sitemapPath = path.join(staticDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error(
    `[sitemap] FATAL: ${path.relative(process.cwd(), sitemapPath)} missing — run astro build first.`,
  );
  process.exit(1);
}

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const doc = validateSitemapDocument(sitemapXml);
errors.push(...doc.errors);

for (const loc of doc.locs) {
  const htmlPath = locToIndexHtml(staticDir, loc);
  if (!fs.existsSync(htmlPath)) {
    errors.push(`sitemap <loc> has no built page: ${loc} (expected ${path.relative(process.cwd(), htmlPath)})`);
  }
}

const indexPath = path.join(staticDir, 'sitemap-index.xml');
if (fs.existsSync(indexPath)) {
  const indexXml = fs.readFileSync(indexPath, 'utf8');
  if (!/^<\?xml\s/i.test(indexXml)) {
    errors.push('sitemap-index.xml missing XML declaration');
  }
  if (!/<sitemapindex[\s>]/.test(indexXml)) {
    errors.push('sitemap-index.xml missing <sitemapindex> root');
  }
  if (!indexXml.includes(`<loc>${PRODUCTION_ORIGIN}/sitemap.xml</loc>`)) {
    errors.push('sitemap-index.xml must point to production sitemap.xml');
  }
  const indexLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  for (const loc of indexLocs) {
    if (loc !== `${PRODUCTION_ORIGIN}/sitemap.xml`) {
      errors.push(`sitemap-index.xml unexpected loc: ${loc}`);
    }
  }
}

const sitemap0 = path.join(staticDir, 'sitemap-0.xml');
if (fs.existsSync(sitemap0)) {
  const s0 = validateSitemapDocument(fs.readFileSync(sitemap0, 'utf8'));
  if (s0.locs.length !== doc.locs.length) {
    errors.push(`sitemap-0.xml URL count (${s0.locs.length}) != sitemap.xml (${doc.locs.length})`);
  }
  const setA = new Set(doc.locs);
  for (const loc of s0.locs) {
    if (!setA.has(loc)) errors.push(`sitemap-0.xml loc not in sitemap.xml: ${loc}`);
  }
}

const robotsPath = path.join(staticDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  errors.push('robots.txt missing from static output');
} else {
  errors.push(...validateRobotsSitemapLine(fs.readFileSync(robotsPath, 'utf8')));
}

const canonicals = collectCanonicalUrls(staticDir);
const sitemapSet = new Set(doc.locs);

for (const loc of doc.locs) {
  if (!canonicals.has(loc)) {
    errors.push(`sitemap <loc> missing matching canonical in page HTML: ${loc}`);
  }
}

for (const canonical of canonicals) {
  if (canonical.includes('/404') || canonical.includes('/go/')) continue;
  if (!sitemapSet.has(canonical)) {
    errors.push(`page canonical missing from sitemap: ${canonical}`);
  }
}

if (errors.length > 0) {
  console.error(`[sitemap] Pre-deploy validation failed (${errors.length} error(s)):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `[sitemap] Pre-deploy validation OK: ${doc.locs.length} URL(s), XML valid, ${canonicals.size} canonical(s) aligned, robots.txt OK`,
);

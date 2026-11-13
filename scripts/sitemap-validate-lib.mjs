import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTION_HOST, PRODUCTION_ORIGIN } from '../src/config/production-origin.mjs';

/** Paths that must never appear in the production sitemap. */
export const SITEMAP_EXCLUDED_PATH_PREFIXES = [
  '/go/',
  '/cheats/',
  '/contact/',
  '/404',
];

const FORBIDDEN_LOC = [
  /workers\.dev/i,
  /\.workers\./i,
  /cloudflarepages\.com/i,
  /pages\.dev/i,
  /github\.com/i,
  /localhost/i,
  /127\.0\.0\.1/i,
];

/**
 * @param {string} xml
 * @returns {{ ok: boolean, errors: string[], locs: string[] }}
 */
export function validateSitemapDocument(xml) {
  const errors = [];
  if (!xml?.trim()) {
    return { ok: false, errors: ['sitemap is empty'], locs: [] };
  }
  if (!/^<\?xml\s/i.test(xml)) {
    errors.push('missing XML declaration');
  }
  if (!/<urlset[\s>]/.test(xml)) {
    errors.push('missing <urlset> root element');
  }
  if (!/xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(xml)) {
    errors.push('missing or wrong sitemap xmlns');
  }
  const openUrl = (xml.match(/<url>/g) ?? []).length;
  const closeUrl = (xml.match(/<\/url>/g) ?? []).length;
  if (openUrl === 0) {
    errors.push('sitemap contains zero <url> entries');
  }
  if (openUrl !== closeUrl) {
    errors.push(`unbalanced <url> tags (${openUrl} open, ${closeUrl} close)`);
  }

  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length !== openUrl) {
    errors.push(`each <url> must have exactly one <loc> (found ${locs.length} locs, ${openUrl} urls)`);
  }

  const seen = new Set();
  for (const loc of locs) {
    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      errors.push(`invalid URL in <loc>: ${loc}`);
      continue;
    }
    if (parsed.protocol !== 'https:') {
      errors.push(`<loc> must use https: ${loc}`);
    }
    if (parsed.hostname !== PRODUCTION_HOST) {
      errors.push(`<loc> must use host ${PRODUCTION_HOST}: ${loc}`);
    }
    if (parsed.hash) {
      errors.push(`<loc> must not include hash: ${loc}`);
    }
    for (const pattern of FORBIDDEN_LOC) {
      if (pattern.test(loc)) {
        errors.push(`forbidden host/path in <loc>: ${loc}`);
      }
    }
    const pathname =
      parsed.pathname === '/' ? '/' : parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
    if (pathname !== parsed.pathname && pathname !== '/') {
      errors.push(`<loc> must use trailing slash: ${loc}`);
    }
    for (const prefix of SITEMAP_EXCLUDED_PATH_PREFIXES) {
      if (pathname === prefix || pathname.startsWith(prefix)) {
        errors.push(`excluded path must not be in sitemap: ${loc}`);
      }
    }
    if (pathname.includes('/rss.xml')) {
      errors.push(`RSS URL must not be in sitemap: ${loc}`);
    }
    const key = `${parsed.origin}${pathname}`;
    if (seen.has(key)) {
      errors.push(`duplicate <loc>: ${loc}`);
    }
    seen.add(key);
  }

  return { ok: errors.length === 0, errors, locs };
}

/**
 * @param {string} staticDir
 * @param {string} loc
 */
export function locToIndexHtml(staticDir, loc) {
  const u = new URL(loc);
  const rel =
    u.pathname === '/' ? 'index.html' : path.join(u.pathname.slice(1), 'index.html').replace(/\\/g, '/');
  return path.join(staticDir, rel);
}

/**
 * @param {string} staticDir
 * @returns {Set<string>} canonical URLs from built HTML
 */
export function collectCanonicalUrls(staticDir) {
  const canon = new Set();
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name !== 'index.html') continue;
      const html = fs.readFileSync(full, 'utf8');
      const match = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
      if (!match) continue;
      const href = match[1].trim();
      if (href.startsWith(`${PRODUCTION_ORIGIN}/`) || href === `${PRODUCTION_ORIGIN}/`) {
        canon.add(href);
      }
    }
  }
  walk(staticDir);
  return canon;
}

/**
 * @param {string} robotsText
 * @returns {string[]}
 */
export function validateRobotsSitemapLine(robotsText) {
  const errors = [];
  const expected = `Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml`;
  if (!robotsText.includes(expected)) {
    errors.push(`robots.txt must include exactly: ${expected}`);
  }
  if (/workers/i.test(robotsText)) {
    errors.push('robots.txt must not mention workers');
  }
  const sitemapLines = robotsText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^Sitemap:/i.test(l));
  if (sitemapLines.length !== 1) {
    errors.push(`robots.txt must declare exactly one Sitemap line (found ${sitemapLines.length})`);
  }
  return errors;
}

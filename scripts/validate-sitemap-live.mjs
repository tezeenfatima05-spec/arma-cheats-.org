/**
 * Post-deploy live sitemap validation.
 * Usage: node scripts/validate-sitemap-live.mjs
 */
import {
  validateRobotsSitemapLine,
  validateSitemapDocument,
} from './sitemap-validate-lib.mjs';
import { PRODUCTION_ORIGIN } from '../src/config/production-origin.mjs';

const TIMEOUT_MS = 25_000;

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': 'armacheats-sitemap-validator/1.0' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return { status: res.status, text: await res.text(), finalUrl: res.url };
}

async function probeUrl(loc) {
  try {
    const res = await fetch(loc, {
      redirect: 'follow',
      headers: { 'User-Agent': 'armacheats-sitemap-validator/1.0' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      return { ok: false, detail: `HTTP ${res.status} for ${loc}` };
    }
    const expected = new URL(loc);
    const final = new URL(res.url);
    if (final.origin !== expected.origin || final.pathname !== expected.pathname) {
      return { ok: false, detail: `URL resolved elsewhere: ${loc} → ${res.url}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, detail: `${loc}: ${err instanceof Error ? err.message : String(err)}` };
  }
}

const errors = [];

let robotsRes;
try {
  robotsRes = await fetchText(`${PRODUCTION_ORIGIN}/robots.txt`);
} catch (err) {
  console.error('[sitemap:live] FATAL: cannot fetch robots.txt:', err);
  process.exit(1);
}
if (robotsRes.status !== 200) {
  errors.push(`live robots.txt HTTP ${robotsRes.status}`);
} else {
  errors.push(...validateRobotsSitemapLine(robotsRes.text));
}

let sitemapRes;
try {
  sitemapRes = await fetchText(`${PRODUCTION_ORIGIN}/sitemap.xml`);
} catch (err) {
  console.error('[sitemap:live] FATAL: cannot fetch sitemap.xml:', err);
  process.exit(1);
}

if (sitemapRes.status !== 200) {
  console.error(`[sitemap:live] FATAL: live sitemap.xml HTTP ${sitemapRes.status}`);
  process.exit(1);
}

const doc = validateSitemapDocument(sitemapRes.text);
errors.push(...doc.errors);

for (const loc of doc.locs) {
  const probe = await probeUrl(loc);
  if (!probe.ok) {
    errors.push(probe.detail ?? `failed live URL: ${loc} (HTTP ${probe.status})`);
  }
}

if (errors.length > 0) {
  console.error(`[sitemap:live] Validation failed (${errors.length} error(s)):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `[sitemap:live] OK: robots.txt + sitemap.xml valid; ${doc.locs.length} live URL(s) returned success`,
);

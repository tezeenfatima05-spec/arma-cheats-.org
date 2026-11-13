/** Canonical live site — never emit workers.dev or preview hosts in SEO output. */
export const PRODUCTION_ORIGIN = 'https://armacheats.org';
export const PRODUCTION_HOST = 'armacheats.org';

const BLOCKED_HOST =
  /(^|\.)workers\.dev$|\.workers\.|pages\.dev$|cloudflarepages\.com$|localhost$|127\.0\.0\.1$/i;

/**
 * @param {string | undefined} envValue PUBLIC_SITE_ORIGIN from CI (optional)
 * @returns {string}
 */
export function resolvePublicSiteOrigin(envValue) {
  const trimmed = envValue?.trim().replace(/\/$/, '');
  if (!trimmed) return PRODUCTION_ORIGIN;
  let host;
  try {
    host = new URL(trimmed).hostname;
  } catch {
    return PRODUCTION_ORIGIN;
  }
  if (BLOCKED_HOST.test(host) || host.includes('workers')) return PRODUCTION_ORIGIN;
  if (host !== PRODUCTION_HOST) return PRODUCTION_ORIGIN;
  return trimmed;
}

/**
 * @param {string} xml
 * @param {string} [origin]
 */
export function rewriteAbsoluteUrlsInXml(xml, origin = PRODUCTION_ORIGIN) {
  return xml.replace(/<loc>([^<]+)<\/loc>/g, (_match, rawUrl) => {
    try {
      const u = new URL(rawUrl);
      const pathname =
        u.pathname === '/' ? '/' : u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
      return `<loc>${origin}${pathname}${u.search}</loc>`;
    } catch {
      return `<loc>${rawUrl}</loc>`;
    }
  });
}

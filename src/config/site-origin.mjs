/** Build-time site origin (set PUBLIC_SITE_ORIGIN on Workers preview). */
export const SITE_ORIGIN = (
  process.env.PUBLIC_SITE_ORIGIN || 'https://armacheats.org'
).replace(/\/$/, '');

import { resolvePublicSiteOrigin, PRODUCTION_ORIGIN } from './production-origin.mjs';

export const SITE_ORIGIN = resolvePublicSiteOrigin(process.env.PUBLIC_SITE_ORIGIN);

export { PRODUCTION_ORIGIN };

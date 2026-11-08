import { fixDistRedirects } from './fix-dist-redirects.mjs';

/** Run after build when Workers Builds uses `npx wrangler deploy` (may skip repo postbuild). */
fixDistRedirects();

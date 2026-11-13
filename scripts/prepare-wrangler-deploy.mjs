import fs from 'node:fs';
import path from 'node:path';
import { getStaticOutputDir } from './dist-output.mjs';

/**
 * Astro writes dist/client/wrangler.json with a server worker + KV/IMAGES bindings.
 * This static site deploys as Workers Static Assets only (root wrangler.jsonc).
 */
const staticDir = getStaticOutputDir();
const generatedWrangler = path.join(staticDir, 'wrangler.json');
if (fs.existsSync(generatedWrangler)) {
  fs.unlinkSync(generatedWrangler);
  console.log('[deploy] Removed generated dist/client/wrangler.json (assets-only deploy)');
}

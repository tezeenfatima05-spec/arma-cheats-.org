import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticOutputDir } from './dist-output.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/**
 * Astro writes dist/client/wrangler.json with a server worker + KV/IMAGES bindings.
 * This static site deploys as Workers Static Assets only (root wrangler.jsonc).
 */
const staticDir = getStaticOutputDir();
const generatedWrangler = path.join(staticDir, 'wrangler.json');
if (fs.existsSync(generatedWrangler)) {
  fs.unlinkSync(generatedWrangler);
  console.log('[deploy] Removed generated wrangler.json from static output (assets-only deploy)');
}

const relAssetsDir =
  './' + path.relative(root, staticDir).split(path.sep).join('/');

const srcPath = path.join(root, 'wrangler.jsonc');
const stripped = fs
  .readFileSync(srcPath, 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');
const config = JSON.parse(stripped);
config.assets = { ...config.assets, directory: relAssetsDir };

const deployConfigPath = path.join(root, 'wrangler.deploy.jsonc');
fs.writeFileSync(deployConfigPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log(`[deploy] Wrote ${path.basename(deployConfigPath)} (assets → ${relAssetsDir})`);
/**
 * Rewrites registry.ts to import Lucide icons per-file (avoids @lucide/astro aliases barrel → dev timeout).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'node_modules/@lucide/astro/src/icons/index.ts');
const registryPath = path.join(root, 'src/components/icons/registry.ts');

const index = fs.readFileSync(indexPath, 'utf8');
const symbolToFile = new Map();
for (const m of index.matchAll(/export \{ default as (\w+) \} from '\.\/([^']+)'/g)) {
  symbolToFile.set(m[1], m[2]);
}

/** Lucide deprecated names re-exported via aliases.ts (not in icons/index under that name). */
const LEGACY_ICON_FILES = {
  BarChart3: 'chart-column',
  CircleHelp: 'circle-question-mark',
  Fingerprint: 'fingerprint-pattern',
};

const registry = fs.readFileSync(registryPath, 'utf8');
const importBlock = registry.match(/import \{([^}]+)\} from '@lucide\/astro';/s);
if (!importBlock) throw new Error('Could not find lucide import block in registry.ts');

const symbols = importBlock[1]
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const missing = [];
const importLines = symbols.map((sym) => {
  const file = symbolToFile.get(sym) ?? LEGACY_ICON_FILES[sym];
  if (!file) {
    missing.push(sym);
    return null;
  }
  return `import ${sym} from '@lucide/astro/icons/${file}';`;
});

if (missing.length) {
  console.error('Missing icon files for:', missing.join(', '));
  process.exit(1);
}

const barrelRe =
  /import type \{ AstroComponent \} from 'astro\/types';\r?\nimport \{[\s\S]*?\} from '@lucide\/astro';\r?\n/;
if (!barrelRe.test(registry)) {
  console.log(`[skip] ${registryPath} (already uses per-icon imports).`);
  process.exit(0);
}

const next = registry.replace(
  barrelRe,
  `import type { AstroComponent } from 'astro/types';\n${importLines.join('\n')}\n`,
);

fs.writeFileSync(registryPath, next);
console.log(`Updated ${registryPath} (${symbols.length} per-icon imports).`);

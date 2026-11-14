/**
 * Restore layout/markup from NOT-OPTIMISED template (ARMA content stays in i18n/data).
 * Usage: node scripts/sync-from-template.mjs
 */
import fs from 'node:fs';
import https from 'node:https';

const BASE = 'https://raw.githubusercontent.com/Stellarhamza/NOT-OPTIMISED/main';

const FILES = [
  'src/components/HeroSection.astro',
  'src/components/FeaturesSection.astro',
  'src/components/ProductsSection.astro',
  'src/components/ContentSections.astro',
  'src/components/WhySetupSection.astro',
  'src/styles/starwind.css',
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (res.statusCode !== 200) reject(new Error(`${url} → ${res.statusCode}`));
          else resolve(data);
        });
      })
      .on('error', reject);
  });
}

function localize(source) {
  return (
    source
      .replace(/checkoutPath\('dota2'\)/g, "checkoutPath('armaReforger')")
      .replace(/checkoutPath\("dota2"\)/g, 'checkoutPath("armaReforger")')
      .replace(
        /<span class="truncate" aria-hidden="true">Dota<span class="text-primary">Cheats<\/span><\/span>/g,
        '<span class="truncate" aria-hidden="true">ARMA<span class="text-primary">Cheats</span></span>',
      )
      // Tailwind: postcss.config.mjs (@tailwindcss/postcss); starwind uses tailwindcss/index.css if synced.
      .replace(/\r?\n@import "\.\/global\.css";\s*$/u, '\n')
      .replace(/@import "tailwindcss";/, '@import "tailwindcss/index.css";')
      // PostCSS resolves index.css; bare "tailwindcss" breaks Vite postcss-import in some pipelines.
      // Master game sites (BattleBit / ARMA) use a two-line hero headline; NOT-OPTIMISED barrel is single-line.
      .replace(
        /function isScriptsHero\(title: string\) \{\r?\n\s*return title === 'Scripts';\r?\n\}/,
        `function isFeaturedBentoHero(index: number) {\n  return index === 0;\n}`,
      )
      .replace(
        /s\.items\.map\(\(item\) => \{\r?\n\s*const scriptsHero = isScriptsHero\(item\.title\);/,
        's.items.map((item, index) => {\n          const scriptsHero = isFeaturedBentoHero(index);',
      )
      .replace(
        /<h1 id="hero-title" class="text-4xl font-bold uppercase leading-tight md:text-5xl">\r?\n\s*<span class="block text-primary">\{h\.titleLine2\}<\/span>\r?\n\s*<\/h1>/,
        `<h1 id="hero-title" class="text-4xl font-bold uppercase leading-tight md:text-5xl">
          <span class="block text-foreground">{h.titleLine1}</span>
          <span class="block text-primary">{h.titleLine2}</span>
        </h1>`,
      )
  );
}

for (const rel of FILES) {
  const url = `${BASE}/${rel}`;
  const raw = await fetch(url);
  const next = localize(raw);
  const existing = fs.existsSync(rel) ? fs.readFileSync(rel, 'utf8') : '';
  if (existing === next) {
    console.log(`[skip] ${rel} (already matches template markup)`);
    continue;
  }
  fs.writeFileSync(rel, next);
  console.log(`[write] ${rel}`);
}

console.log('Done. Content (ARMA) unchanged in src/i18n and src/data.');

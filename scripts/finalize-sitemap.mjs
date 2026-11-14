import fs from 'node:fs';
import path from 'node:path';
import { findSitemap0Path, getStaticOutputDir } from './dist-output.mjs';
import {
  PRODUCTION_ORIGIN,
  rewriteAbsoluteUrlsInXml,
} from '../src/config/production-origin.mjs';
import { collectCanonicalUrls } from './sitemap-validate-lib.mjs';
import { writeWorkersRedirectsOnly } from './workers-redirects-body.mjs';

const staticDir = getStaticOutputDir();
const source = findSitemap0Path();
const lastmod = new Date().toISOString().slice(0, 10);

function sitemapMetaForPath(pathname) {
  if (pathname === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (pathname === '/blog/') return { priority: '0.9', changefreq: 'weekly' };
  if (pathname === '/forum/') return { priority: '0.8', changefreq: 'daily' };
  if (pathname.startsWith('/forum/')) return { priority: '0.6', changefreq: 'weekly' };
  if (pathname.startsWith('/blog/')) return { priority: '0.7', changefreq: 'monthly' };
  if (pathname.startsWith('/products/')) return { priority: '0.8', changefreq: 'weekly' };
  if (
    pathname === '/about/' ||
    pathname === '/support/' ||
    pathname === '/privacy/' ||
    pathname === '/terms/' ||
    pathname === '/faq/'
  ) {
    return { priority: '0.5', changefreq: 'yearly' };
  }
  return { priority: '0.6', changefreq: 'monthly' };
}

/** Build urlset XML when @astrojs/sitemap did not emit sitemap-0.xml (always armacheats.org). */
function buildUrlsetFromCanonicals(canonicals) {
  const sorted = [...canonicals].sort();
  const urls = sorted
    .map((loc) => {
      const pathname = new URL(loc).pathname;
      const { priority, changefreq } = sitemapMetaForPath(pathname);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
    })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>
`;
}

let raw;
if (source) {
  raw = fs.readFileSync(source, 'utf8');
} else {
  console.warn(
    '[finalize-sitemap] sitemap-0.xml missing — generating from built page canonicals (armacheats.org only).',
  );
  const canonicals = collectCanonicalUrls(staticDir);
  if (canonicals.size === 0) {
    console.error('finalize-sitemap: no canonical URLs found in dist HTML.');
    process.exit(1);
  }
  raw = buildUrlsetFromCanonicals(canonicals);
}

const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

let formatted = formatUrlset(raw);
formatted = rewriteAbsoluteUrlsInXml(formatted, PRODUCTION_ORIGIN);
fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${PRODUCTION_ORIGIN}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(staticDir, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(staticDir, 'sitemap-0.xml'), formatted, 'utf8');

console.log(
  `Sitemap finalized: ${urlCount} URLs → ${path.relative(process.cwd(), staticDir)}/sitemap.xml (${PRODUCTION_ORIGIN})`,
);

writeWorkersRedirectsOnly();
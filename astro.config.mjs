import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import workersRedirects from './integrations/workers-redirects.mjs';
import { resolvePublicSiteOrigin } from './src/config/production-origin.mjs';

const siteOrigin = resolvePublicSiteOrigin(process.env.PUBLIC_SITE_ORIGIN);

export default defineConfig({
  site: siteOrigin,
  output: 'static',
  adapter: cloudflare(),
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/arma-reforger-cheats/',
    '/cheats/lite/': '/products/arma-reforger-cheats/',
    '/cheats/pro/': '/products/arma-reforger-cheats/',
    '/cheats/elite/': '/products/arma-reforger-cheats/arma-reforger/',
    '/cheats/compare/': '/blog/arma-reforger-aimbot-setup/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 3000,
    host: true,
  },
  integrations: [
    workersRedirects(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/go/') &&
        !page.includes('/cheats/') &&
        !page.includes('/contact/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_SITE_ORIGIN': JSON.stringify(siteOrigin),
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});

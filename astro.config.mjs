import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
const siteOrigin = (process.env.PUBLIC_SITE_ORIGIN || 'https://armacheats.org').replace(
  /\/$/,
  '',
);

export default defineConfig({
  site: siteOrigin,
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
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
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

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import workersRedirects from './integrations/workers-redirects.mjs';
import {
  PRODUCTION_ORIGIN,
  resolvePublicSiteOrigin,
} from './src/config/production-origin.mjs';
import { DEV_HOST, DEV_ORIGIN, DEV_PORT } from './src/config/dev-server.mjs';

const productionOrigin =
  resolvePublicSiteOrigin(process.env.PUBLIC_SITE_ORIGIN) || PRODUCTION_ORIGIN;

export default defineConfig(({ command }) => {
  const isDev = command === 'dev';
  // Sitemap + canonicals always target armacheats.org on production builds (never workers.dev).
  const siteOrigin = isDev ? DEV_ORIGIN : productionOrigin;

  return {
    site: siteOrigin,
    output: 'static',
    session: false,
    // Cloudflare worker only for production builds — dev uses normal Vite CSS (avoids broken styling on Windows).
    adapter: isDev
      ? undefined
      : cloudflare({
          imageService: 'compile',
        }),
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
      port: DEV_PORT,
      host:
        DEV_HOST === '0.0.0.0'
          ? true
          : DEV_HOST,
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
      server: {
        warmup: {
          clientFiles: ['./src/components/icons/registry.ts'],
        },
      },
      optimizeDeps: {
        exclude: ['@lucide/astro'],
      },
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
  };
});

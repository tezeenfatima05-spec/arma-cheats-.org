/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'ARMA REFORGER Cheats — Aimbot, ESP & Wallhack | ARMA Cheats',
    description:
      'Explore ARMA REFORGER cheats for PC featuring customizable aimbot, player ESP, wallhack, skeleton ESP, health bars, weapon information, and Cloud DMA support at ARMA Cheats.',
  },
  '/products/arma-reforger-cheats/': {
    title: 'ARMA REFORGER Cheats for PC — Aimbot & Player ESP',
    description:
      'ARMA REFORGER cheats with aimbot, player ESP, bounding boxes, skeleton overlays, config profiles, and Cloud DMA compatibility at armacheats.org.',
  },
  '/products/arma-reforger-cheats/arma-reforger/': {
    title: 'ARMA REFORGER Cheats — Full Feature List',
    description:
      'Custom aimbot, adaptive FOV, player ESP, health bars, team filters, misc keybinds, and multi-language menu for ARMA REFORGER on PC.',
  },
  '/products/arma-reforger-cheats/cloud-dma/': {
    title: 'Cloud DMA for ARMA REFORGER | ARMA Cheats',
    description:
      'Cloud DMA compatibility tools and setup guidance for ARMA REFORGER external suites on PC.',
  },
  '/products/arma-reforger-cheats/hwid-spoofer/': {
    title: 'HWID Spoofer Utility | ARMA Cheats',
    description:
      'HWID spoofer utilities for identifier cleanup and rotation when your PC needs a fresh hardware profile.',
  },
  '/blog/': {
    title: 'ARMA REFORGER Guides & Setup Tips',
    description:
      'Aimbot tuning, ESP config, Cloud DMA notes, and purchase walkthroughs for ARMA REFORGER cheats on armacheats.org.',
  },
  '/forum/': {
    title: 'ARMA REFORGER Community Forum | ARMA Cheats',
    description:
      'Discuss aimbot settings, ESP layouts, config profiles, and setup questions for ARMA REFORGER on PC.',
  },
  '/faq/': {
    title: 'FAQ | ARMA REFORGER Cheats & Setup',
    description:
      'Answers on aimbot, player ESP, Cloud DMA, checkout, configs, and guides at armacheats.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | ARMA Cheats',
    description:
      'Purchase terms, license use, and refund policy for ARMA Cheats products sold through armacheats.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | ARMA Cheats',
    description:
      'How armacheats.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About ARMA Cheats',
    description:
      'What ARMA Cheats publishes: ARMA REFORGER feature guides, setup tips, and status notes at armacheats.org.',
  },
  '/support/': {
    title: 'Support | ARMA Cheats',
    description:
      'Get help with loader setup, Cloud DMA, configs, and checkout for ARMA REFORGER cheats.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

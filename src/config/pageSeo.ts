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
    title: 'Arma Reforger Cheats – Aimbot, ESP & Wallhack | ARMA Cheats',
    description:
      'Arma Reforger cheats for PC: customizable aimbot, player ESP, wallhack, skeleton overlays, health bars, weapon info, and Cloud DMA compatibility.',
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
    title: 'ARMA Reforger guides, setup tips & articles | Cheats',
    description:
      'ARMA Reforger aimbot tuning, ESP config, Cloud DMA notes, and purchase walkthroughs for PC cheats on armacheats.org.',
  },
  '/blog/arma-reforger-aimbot-setup/': {
    title: 'Aimbot – FOV, smoothness & target bones | Cheats',
    description:
      'Configure hold vs always-on aimbot, pick target bones, and draw adaptive FOV without overshooting on ARMA REFORGER PC play.',
  },
  '/blog/arma-reforger-esp-guide/': {
    title: 'ESP – boxes, skeletons & team filters | Cheats',
    description:
      'Balance corner boxes, gradient fills, skeleton thickness, and team filters for readable wallhack-style ESP on ARMA REFORGER.',
  },
  '/blog/arma-reforger-cloud-dma/': {
    title: 'Cloud DMA – firmware, cabling & OS checks | Cheats',
    description:
      'What Cloud DMA compatibility means on PC and what to verify—firmware, cabling, and OS—before checkout for ARMA REFORGER.',
  },
  '/forum/': {
    title: 'Arma Reforger Community Forum — aimbot & ESP | Cheats',
    description:
      'Arma Reforger community forum: discuss aimbot settings, ESP layouts, config profiles, and setup questions for PC play.',
  },
  '/faq/': {
    title: 'FAQ — ARMA REFORGER cheats, setup & checkout | Cheats',
    description:
      'FAQ: answers on aimbot, player ESP, Cloud DMA, checkout, configs, and guides for ARMA REFORGER at armacheats.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | ARMA Cheats',
    description:
      'Purchase terms, license use, and refund policy for ARMA Cheats products sold through armacheats.org.',
  },
  '/privacy/': {
    title: 'Privacy policy — cookies, analytics & contact data | Cheats',
    description:
      'Privacy: how armacheats.org uses analytics, cookies, and contact data when you browse, purchase, or request support.',
  },
  '/about/': {
    title: 'About ARMA Cheats — REFORGER guides & product notes',
    description:
      'What ARMA Cheats publishes: ARMA REFORGER feature guides, setup walkthroughs, status notes, and support paths at armacheats.org.',
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

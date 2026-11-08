import type { BlogPostFull } from './types';
import { PRODUCT_BASE } from '../../config/site';

const productLink = `[ARMA REFORGER cheats](${PRODUCT_BASE})`;

export const blogPosts: BlogPostFull[] = [
  {
    tag: 'Setup',
    title: 'ARMA REFORGER aimbot setup: FOV, smoothness, and bones',
    slug: 'arma-reforger-aimbot-setup',
    image: '/images/blog/arma-reforger-aimbot-setup.webp',
    desc: 'Configure hold vs always aimbot, pick target bones, and draw adaptive FOV without overshooting.',
    date: 'Mar 1, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: `ARMA REFORGER aimbot settings live in a dedicated tab on ${productLink}. Start with aimbot disabled, enable it only after you bind a comfortable aim key, then pick a single target bone before you touch smoothness.`,
      },
      { type: 'h2', text: 'Hold vs always-on' },
      {
        type: 'p',
        text: 'On hold keeps tracking behind a key press—better for selective engagements. Always-on tracks whenever a valid target is inside FOV; use higher smoothness if you choose this mode.',
      },
      { type: 'h2', text: 'Adaptive FOV drawing' },
      {
        type: 'p',
        text: 'Enable draw FOV border and background while tuning so you see the active cone. Shrink FOV size until it matches your main weapon range, then disable the draws for live play.',
      },
      {
        type: 'p',
        text: 'Save the result as a named config after testing in a private session. Read the [ESP guide](/blog/arma-reforger-esp-guide/) next so aimbot and player visuals stay balanced.',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ARMA REFORGER ESP guide: boxes, skeletons, and health bars',
    slug: 'arma-reforger-esp-guide',
    image: '/images/blog/arma-reforger-esp-guide.webp',
    desc: 'Balance corner boxes, gradient fills, skeleton thickness, and team filters for clear wallhack-style ESP.',
    date: 'Feb 28, 2026',
    readTime: '7 min read',
    body: [
      {
        type: 'p',
        text: `Player ESP is the core wallhack-style layer in ${productLink}. Pick ESP style with or without background first—background helps readability on bright maps but adds clutter in CQB.`,
      },
      { type: 'h2', text: 'Boxes and skeletons' },
      {
        type: 'p',
        text: 'Corner boxes work well at distance; full boxes read better in urban fights. Pair skeleton thickness with head circle only after base boxes feel stable.',
      },
      { type: 'h2', text: 'Health and team filters' },
      {
        type: 'p',
        text: 'Health-based bars give faster lethality reads than static colors. Toggle show team when you squad with randoms so friendly markers stay visible.',
      },
    ],
  },
  {
    tag: 'Hardware',
    title: 'Cloud DMA requirements for ARMA REFORGER cheats',
    slug: 'arma-reforger-cloud-dma',
    image: '/images/blog/arma-reforger-cloud-dma.webp',
    desc: 'What Cloud DMA compatibility means and what to verify on your PC before checkout.',
    date: 'Feb 27, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Cloud DMA describes the external hardware workflow advertised for this ARMA REFORGER build. Verify firmware, cabling, and OS build against the notes on the product page before you purchase.',
      },
      { type: 'h2', text: 'Before checkout' },
      {
        type: 'p',
        text: 'Confirm Windows 10 or 11 64-bit, administrator rights for the loader, and that your DMA stack matches the published compatibility list. If anything is unclear, email support with your hardware summary.',
      },
    ],
  },
  {
    tag: 'Setup',
    title: 'ARMA REFORGER config profiles: create, load, and rename',
    slug: 'arma-reforger-config-profiles',
    image: '/images/blog/arma-reforger-config-profiles.webp',
    desc: 'Save ranked and casual presets with create, load, rename, and delete config tools.',
    date: 'Feb 26, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Misc options include full config management. Create a profile after your first stable tune, duplicate it before patch days, and rename configs by map or weapon class.',
      },
      { type: 'h2', text: 'Suggested naming' },
      {
        type: 'p',
        text: 'Examples: conflict-long-range, seize-cqb, night-ops-low-clutter. Delete outdated files so load lists stay short.',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'ARMA REFORGER wallhack tips without cluttered ESP',
    slug: 'arma-reforger-wallhack-tips',
    image: '/images/blog/arma-reforger-wallhack-tips.webp',
    desc: 'Reduce on-screen noise while keeping distance, weapon, and line-to-enemy intel.',
    date: 'Feb 25, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'Wallhack-style awareness fails when every overlay is maxed. Disable line-to-enemy until boxes and distance readouts feel clean, then add one visual at a time.',
      },
      { type: 'h2', text: 'Weapon and distance tags' },
      {
        type: 'p',
        text: 'Weapon ESP matters on mixed gear lobbies; distance ESP matters on open terrain. Raise max distance gradually instead of showing every soldier on the map at once.',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'How to buy ARMA REFORGER cheats in 2026',
    slug: 'how-to-buy-arma-reforger-cheats',
    image: '/images/blog/how-to-buy-arma-reforger-cheats.webp',
    desc: 'Step-by-step secure checkout and first-launch checklist.',
    date: 'Feb 24, 2026',
    readTime: '4 min read',
    body: [
      {
        type: 'p',
        text: `Open ${productLink}, review the feature list, then use Buy Now to reach secure checkout. Save your license email immediately.`,
      },
      { type: 'h2', text: 'After purchase' },
      {
        type: 'p',
        text: 'Download the loader from the operator portal, load a conservative preset, and test aimbot smoothness plus ESP distance before public multiplayer.',
      },
    ],
  },
];

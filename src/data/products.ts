import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_BASE } from '../config/site';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  'arma-reforger': [
    'arma-reforger-aimbot-setup',
    'arma-reforger-esp-guide',
    'arma-reforger-cloud-dma',
    'how-to-buy-arma-reforger-cheats',
  ],
};

const productBase = PRODUCT_BASE;
const gameplay = '/images/gameplay';

const galleryRaw = {
  gpVisuals: {
    src: `${gameplay}/screenshot-1.webp`,
    alt: 'ARMA REFORGER player ESP with bounding boxes and soldier overlays',
    caption: 'Player visuals',
    captionDesc: 'ESP styles, corner boxes, skeleton lines, and name tags in a live engagement.',
  },
  gpAimbot: {
    src: `${gameplay}/screenshot-2.webp`,
    alt: 'ARMA REFORGER aimbot menu with adaptive FOV and bone targeting',
    caption: 'Aimbot options',
    captionDesc: 'Custom aim key, target bone selection, smoothness, and FOV border drawing.',
  },
  gpWorld: {
    src: `${gameplay}/screenshot-3.webp`,
    alt: 'ARMA REFORGER battlefield view with distance and weapon ESP',
    caption: 'World awareness',
    captionDesc: 'Distance readouts, weapon labels, and team filters across open terrain.',
  },
  gpMisc: {
    src: `${gameplay}/screenshot-4.webp`,
    alt: 'ARMA REFORGER misc settings for configs, DPI scale, and languages',
    caption: 'Misc & configs',
    captionDesc: 'Menu keybinds, FPS limit, watermark toggle, and saved config profiles.',
  },
  gpEspBox: {
    src: `${gameplay}/screenshot-5.webp`,
    alt: 'ARMA REFORGER corner box ESP on multiple enemy soldiers',
    caption: 'Box ESP',
    captionDesc: 'Corner and full box modes with gradient fills and line-to-enemy indicators.',
  },
  gpHealth: {
    src: `${gameplay}/screenshot-6.webp`,
    alt: 'ARMA REFORGER health bars and team identification ESP',
    caption: 'Health & team ESP',
    captionDesc: 'Health-based bars, team name tags, and show-team filters for squad play.',
  },
  gpHero: {
    src: `${gameplay}/hero-poster.webp`,
    alt: 'ARMA REFORGER tactical gameplay with overlay preview',
    caption: 'Tactical overview',
    captionDesc: 'Combined aimbot and player ESP workflow on PC multiplayer servers.',
  },
};

type GalleryKey = keyof typeof galleryRaw;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live status banner on armacheats.org before purchase—especially after a game update.',
  },
  {
    num: '02',
    title: 'Confirm Cloud DMA requirements',
    desc: 'Verify your PC meets Cloud DMA compatibility notes on the product page before checkout.',
  },
  {
    num: '03',
    title: 'Complete secure checkout',
    desc: 'Use the Buy Now flow to reach checkout, then save your license email for portal access.',
  },
  {
    num: '04',
    title: 'Load configs and test',
    desc: 'Import a conservative preset, tune aimbot smoothness and ESP distance, then test in a private session.',
  },
];

const armaSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqCpu', text: 'ARMA REFORGER installed with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet for portal access, config sync, and patch delivery.' },
  { icon: 'reqSteam', text: 'Cloud DMA-compatible setup as described on the product page.' },
];

const fullFeatureList = [
  'Enable Aimbot',
  'Custom Aim Key',
  'Target bone (Head, Neck, Body, Pelvis)',
  'Type (On hold, Always)',
  'Adaptive FOV',
  'Draw FOV Border',
  'Draw FOV Background',
  'FOV Size',
  'Smoothness',
  'Max distance',
  'ESP Style (With background, No background)',
  'Bounding box (Box, Corner)',
  'Fill box (Static, Gradient)',
  'Line to enemy (Color, Position)',
  'Health bar (Static, Health based, Gradient)',
  'Skeleton (Thickness, Head circle)',
  'Name',
  'Current weapon',
  'Team name',
  'Distance',
  'Show team',
  'Menu keybind',
  'Unload keybind',
  'DPI Scale',
  'FPS Limit',
  'Watermark',
  'Language (EN, RU, CN)',
  'Create config',
  'Load config',
  'Rename config',
  'Delete config',
];

const armaReforgerPage: ProductPage = {
  slug: 'arma-reforger',
  kind: 'tier',
  badge: 'Available',
  tier: 'Standard',
  name: 'ARMA Reforger',
  title: 'ARMA REFORGER Cheats',
  subtitle: 'Aimbot, player ESP, and config tools for PC',
  desc: 'ARMA REFORGER cheats with customizable aimbot, player ESP, wallhack-style visuals, skeleton overlays, and Cloud DMA support.',
  features: [
    'Adaptive FOV aimbot',
    'Player ESP & wallhack',
    'Skeleton & health bars',
    'Weapon & team info',
    'Config profiles',
    'Cloud DMA ready',
  ],
  more: fullFeatureList.length - 6,
  variant: 'popular',
  buyUrl: checkoutForSlug('arma-reforger'),
  images: slide('gpAimbot', 'gpVisuals', 'gpEspBox', 'gpHealth', 'gpWorld', 'gpMisc'),
  overview: {
    title: 'Built for tactical multiplayer on PC',
    paragraphs: [
      'This ARMA REFORGER build groups aimbot, player visuals, and misc settings into clear menu tabs. Tune FOV, smoothness, bone priority, and ESP distance without cluttering your screen.',
      'Config create, load, rename, and delete options let you store ranked and casual presets. EN, RU, and CN language support keeps the menu readable for international squads.',
    ],
  },
  acquisition: {
    title: 'How to get ARMA REFORGER cheats',
    steps: defaultAcquisitionSteps,
  },
  goodToKnow:
    'ARMA REFORGER receives frequent updates. Confirm module availability on armacheats.org before you purchase or launch. Overlay density affects readability on ultrawide and 4K displays.',
  limitations:
    'Third-party software in online games can violate terms of service and lead to account action. You use this software at your own risk. Compatibility can change after game or anti-cheat updates without notice.',
  fullFeatures: fullFeatureList,
  systemRequirements: armaSystemRequirements,
  about: [
    {
      type: 'p',
      text: 'ARMA REFORGER cheats on this page focus on precision aimbot controls and readable player ESP for large-scale multiplayer. Aimbot supports hold and always-on modes with bone selection from head through pelvis.',
    },
    { type: 'h2', text: 'Cloud DMA compatibility' },
    {
      type: 'p',
      text: 'Cloud DMA support is required for the advertised external workflow. Review hardware and firmware notes in the product checkout flow before you buy.',
    },
  ],
  body: [
    { type: 'h2', text: 'ARMA REFORGER Aimbot Features' },
    {
      type: 'p',
      text: 'Enable aimbot, bind a custom aim key, and pick target bones with adaptive FOV drawing. Smoothness and max distance sliders keep tracking natural on open maps.',
    },
    { type: 'h2', text: 'ARMA REFORGER Player ESP and Wallhack' },
    {
      type: 'p',
      text: 'Player ESP includes box and corner modes, gradient fills, skeleton thickness, health bars, weapon readouts, team labels, and line-to-enemy indicators—ideal wallhack-style awareness for PvP.',
    },
    { type: 'h2', text: 'Configuration & misc' },
    {
      type: 'p',
      text: 'Menu and unload keybinds, DPI scale, FPS limit, watermark toggle, and named config slots keep your layout consistent across sessions.',
    },
  ],
  relatedBlogSlugs: productRelatedBlogSlugs['arma-reforger'],
};

export const productPages: ProductPage[] = [armaReforgerPage];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = slide(
  'gpHero',
  'gpAimbot',
  'gpVisuals',
  'gpEspBox',
  'gpHealth',
  'gpWorld',
  'gpMisc',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'ARMA REFORGER cheats with aimbot, player ESP, skeleton overlays, config profiles, and Cloud DMA compatibility for PC.',
  buyUrl: checkoutPath('armaReforger'),
};

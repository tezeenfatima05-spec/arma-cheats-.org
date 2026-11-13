import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { PRODUCT_BASE, SUPPORT_EMAIL } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: 'ARMA Cheats',
    domain: 'armacheats.org',
    title: 'ARMA REFORGER Cheats — Aimbot, ESP & Wallhack | ARMA Cheats',
    description:
      'Explore ARMA REFORGER cheats for PC featuring customizable aimbot, player ESP, wallhack, skeleton ESP, health bars, weapon information, and Cloud DMA support at ARMA Cheats.',
    discord: PRIMARY_CHECKOUT_PATH,
  },
  nav: [
    { href: `${productBase}`, label: 'Products' },
    { href: '/blog/', label: 'Blog' },
    { href: '/forum/', label: 'Forum' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/support/', label: 'Support' },
  ],
  hero: {
    status: 'ARMA REFORGER — build online',
    eyebrow: 'PC tactical suite',
    titleLine1: 'ARMA REFORGER',
    titleLine2: 'ARMA REFORGER Cheats for PC — Aimbot, Player ESP & Wallhack',
    subtitle:
      'Customizable aimbot, player ESP, skeleton overlays, and config tools for ARMA REFORGER multiplayer on PC—with Cloud DMA compatibility and multi-language menu support.',
    ctaPrimary: 'View products',
    ctaDiscord: 'Buy now',
    modesLabel: 'ARMA REFORGER modes',
    modes: ['Conflict', 'Combat Ops', 'Seize', 'Multiplayer'],
    metrics: [
      { label: 'Aimbot bones', strong: '4' },
      { label: 'Languages', strong: 'EN/RU/CN' },
      { label: 'ESP styles', strong: '2' },
      { label: 'Config slots', strong: 'Yes' },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything in one tactical package',
    subtitle: 'Aimbot, player visuals, and misc tools organized for ARMA REFORGER PvP.',
    items: [
      {
        title: 'Aimbot Options',
        subtitle: 'Precision when you need it.',
        desc: 'Full aimbot tab with hold or always-on modes, bone selection, and adaptive FOV you can tune per map.',
        bullets: [
          'Enable Aimbot and custom aim key',
          'Target bone: Head, Neck, Body, Pelvis',
          'Type: On hold or Always',
          'Adaptive FOV with border and background draw',
          'FOV size, smoothness, and max distance',
        ],
        tags: ['ARMA REFORGER aimbot', 'adaptive FOV', 'target bone'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'Player Visual Options',
        subtitle: 'Clear ESP at range.',
        desc: 'Wallhack-style player ESP with boxes, health bars, skeletons, and weapon readouts that stay readable in firefights.',
        bullets: [
          'ESP style with or without background',
          'Bounding box: Box or Corner modes',
          'Fill box: Static or Gradient',
          'Line to enemy with color and position',
          'Health bar: Static, Health based, or Gradient',
        ],
        tags: ['ARMA REFORGER ESP', 'player wallhack', 'skeleton ESP'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Soldier intel',
        subtitle: 'Know who you face.',
        desc: 'Name tags, current weapon, team name, distance, and show-team filters help you pick engagements wisely.',
        bullets: [
          'Skeleton thickness and head circle',
          'Name, weapon, and team name overlays',
          'Distance readouts on every target',
          'Show team toggle for mixed fights',
        ],
        tags: ['weapon ESP', 'team ESP', 'distance ESP'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Misc Options',
        subtitle: 'Comfort and control.',
        desc: 'Keybinds, performance caps, watermark, and named configs keep your layout consistent between sessions.',
        bullets: [
          'Menu and unload keybinds',
          'DPI scale and FPS limit',
          'Watermark on or off',
          'Language: EN, RU, CN',
        ],
        tags: ['config profiles', 'menu keybind', 'multi-language'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'Config manager',
        subtitle: 'Save what works.',
        desc: 'Create, load, rename, and delete configs so ranked and casual presets never overwrite each other.',
        bullets: [
          'Create config from current sliders',
          'Load config before you deploy',
          'Rename configs for squad roles',
          'Delete outdated profiles safely',
        ],
        tags: ['create config', 'load config', 'rename config'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Cloud DMA',
        subtitle: 'External workflow.',
        desc: 'Built for Cloud DMA-compatible rigs—review hardware requirements on the product page before checkout.',
        bullets: [
          'External suite architecture',
          'Setup notes in product docs',
          'Status checks before launch',
          'Conservative defaults recommended',
        ],
        tags: ['ARMA REFORGER Cloud DMA', 'external cheats', 'DMA setup'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'FOV drawing',
        subtitle: 'See your aim cone.',
        desc: 'Optional FOV border and background help you line up adaptive aimbot ranges without guessing.',
        bullets: ['Draw FOV border toggle', 'Draw FOV background toggle', 'Pairs with smoothness sliders'],
        tags: ['FOV aimbot', 'draw FOV', 'ARMA REFORGER FOV'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Performance',
        subtitle: 'Stable frame times.',
        desc: 'FPS limit and DPI scale keep overlays sharp on 1080p through 4K without tanking your rig.',
        bullets: ['FPS limit slider', 'DPI scale for menu clarity', 'Unload keybind for quick disable'],
        tags: ['FPS limit', 'DPI scale', 'unload keybind'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'On-page guides',
        subtitle: 'Learn before you queue.',
        desc: 'Blog and forum posts cover aimbot tuning, ESP clutter reduction, and Cloud DMA prep.',
        bullets: ['Aimbot setup walkthrough', 'ESP layout examples', 'Purchase and install FAQ'],
        tags: ['guides', 'setup tips', 'ARMA REFORGER cheats'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'Tactical tooling with readable overlays',
    subtitle:
      'Many cheat sites dump sliders without structure. ARMA Cheats groups aimbot, ESP, and misc settings the way ARMA REFORGER players actually configure them.',
    usLabel: 'ARMA Cheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Organized feature tabs',
        desc: 'Aimbot, player visuals, and misc options map directly to the product feature list—not random toggles.',
      },
      {
        title: 'Conservative defaults',
        desc: 'Smoothness, FOV, and ESP distance start readable so you can tune up instead of fixing a messy first launch.',
      },
      {
        title: 'Config profile support',
        desc: 'Create, load, rename, and delete configs for different maps or squad roles without rebuilding from scratch.',
      },
      {
        title: 'Multi-language menu',
        desc: 'EN, RU, and CN language options keep the suite usable for international communities.',
      },
      {
        title: 'Cloud DMA documentation',
        desc: 'Hardware expectations are documented on the product page before you commit to checkout.',
      },
      {
        title: 'Secure checkout flow',
        desc: 'Buy buttons route through internal /go/ paths so affiliate URLs stay off visible hover text.',
      },
    ],
    metrics: [
      {
        value: '30+',
        title: 'Feature toggles',
        desc: 'Covering aimbot, ESP, skeleton, health, weapon, team, and config controls.',
      },
      {
        value: '3',
        title: 'Menu languages',
        desc: 'English, Russian, and Chinese interface options.',
      },
      {
        value: '6',
        title: 'Gameplay screenshots',
        desc: 'Real menu and in-game ESP examples across this site.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to your first config in just',
    titleHighlight: 'three simple steps',
    intro:
      'Purchase, confirm Cloud DMA requirements, load a conservative preset, and test ARMA REFORGER before you join public multiplayer.',
    ctaPrimary: 'View products',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Review requirements',
        desc: 'Read Cloud DMA notes and system requirements on the ARMA REFORGER product page.',
      },
      {
        step: 'Step 2',
        title: 'Checkout & portal access',
        desc: 'Complete secure checkout and save your license email for loader and config delivery.',
      },
      {
        step: 'Step 3',
        title: 'Load a preset & test',
        desc: 'Import a default config, set aim key and ESP distance, then verify in a controlled session.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check status on armacheats.org before launching after game updates.',
    items: ['Windows 10 & 11', 'ARMA REFORGER', 'Cloud DMA', 'Config profiles', 'Multi-language', 'Secure checkout', 'External suite', 'Operator guides'],
  },
  cheats: {
    eyebrow: 'Product',
    title: 'ARMA REFORGER Cheats for PC',
    subtitle: 'Aimbot, player ESP, skeleton overlays, and config tools in one build.',
    viewAll: 'View product details',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        tier: 'Standard',
        name: 'ARMA REFORGER',
        title: 'ARMA REFORGER Cheats',
        desc: 'Full ARMA REFORGER suite with aimbot bones, adaptive FOV, player ESP, health bars, and Cloud DMA support.',
        features: ['Adaptive FOV aimbot', 'Player ESP & wallhack', 'Skeleton & health bars', 'Weapon & team ESP', 'Config profiles', 'Cloud DMA ready'],
        more: 24,
        href: `${productBase}arma-reforger/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Products',
    title: 'ARMA REFORGER Cheats for PC',
    subtitle: 'ARMA REFORGER cheats, Cloud DMA, and HWID Spoofer—each with its own checkout.',
    viewAll: 'View product',
    get: 'Get',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        category: 'PC suite',
        title: 'ARMA REFORGER Cheats',
        subtitle: 'Aimbot & player ESP',
        desc: 'Custom aimbot, player wallhack ESP, skeleton overlays, health and weapon readouts, plus named config slots.',
        features: ['Aimbot options tab', 'Player visual ESP', 'Misc & keybinds', 'Config create/load'],
        more: 26,
        href: `${productBase}arma-reforger/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Guides and updates',
    subtitle: 'Aimbot tuning, ESP layouts, Cloud DMA notes, and checkout walkthroughs for ARMA REFORGER.',
    latestTitle: 'Latest articles',
    latestSubtitle: 'Filter by topic or sort to find setup guides and feature deep-dives.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [
      {
        tag: 'Setup',
        title: 'ARMA REFORGER aimbot setup: FOV, smoothness, and bones',
        slug: 'arma-reforger-aimbot-setup',
        image: '/images/blog/arma-reforger-aimbot-setup.webp',
        desc: 'Configure hold vs always aimbot, pick target bones, and draw adaptive FOV without overshooting.',
        date: 'Mar 1, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Features',
        title: 'ARMA REFORGER ESP guide: boxes, skeletons, and health bars',
        slug: 'arma-reforger-esp-guide',
        image: '/images/blog/arma-reforger-esp-guide.webp',
        desc: 'Balance corner boxes, gradient fills, skeleton thickness, and team filters for clear wallhack-style ESP.',
        date: 'Feb 28, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Hardware',
        title: 'Cloud DMA requirements for ARMA REFORGER cheats',
        slug: 'arma-reforger-cloud-dma',
        image: '/images/blog/arma-reforger-cloud-dma.webp',
        desc: 'What Cloud DMA compatibility means, what to verify on your PC, and when to wait for status updates.',
        date: 'Feb 27, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Setup',
        title: 'ARMA REFORGER config profiles: create, load, and rename',
        slug: 'arma-reforger-config-profiles',
        image: '/images/blog/arma-reforger-config-profiles.webp',
        desc: 'Save ranked and casual presets with create, load, rename, and delete config tools.',
        date: 'Feb 26, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'ARMA REFORGER wallhack tips without cluttered ESP',
        slug: 'arma-reforger-wallhack-tips',
        image: '/images/blog/arma-reforger-wallhack-tips.webp',
        desc: 'Reduce on-screen noise while keeping player distance, weapon, and line-to-enemy intel.',
        date: 'Feb 25, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Guides',
        title: 'How to buy ARMA REFORGER cheats in 2026',
        slug: 'how-to-buy-arma-reforger-cheats',
        image: '/images/blog/how-to-buy-arma-reforger-cheats.webp',
        desc: 'Step-by-step secure checkout, what you receive after purchase, and first-launch checklist.',
        date: 'Feb 24, 2026',
        readTime: '4 min read',
      },
    ],
  },
  toolkit: {
    eyebrow: 'Software',
    title: 'Organized, easy to configure',
    subtitle: 'Aimbot, visuals, and misc groups mirror the in-game menu layout.',
    items: [
      { num: '01', label: 'Aimbot', title: 'Bones and FOV in one tab', desc: 'Enable aimbot, bind keys, and tune smoothness with adaptive FOV drawing.' },
      { num: '02', label: 'Visuals', title: 'ESP that stays readable', desc: 'Box modes, skeletons, health bars, and line-to-enemy indicators.' },
      { num: '03', label: 'Intel', title: 'Weapon and team overlays', desc: 'Name, weapon, team, distance, and show-team filters for squad fights.' },
      { num: '04', label: 'Misc', title: 'Keybinds and performance', desc: 'Menu and unload keys, DPI scale, FPS cap, and watermark toggle.' },
      { num: '05', label: 'Configs', title: 'Named profiles', desc: 'Create, load, rename, and delete saved slider sets.' },
      { num: '06', label: 'Language', title: 'EN, RU, CN', desc: 'Switch menu language without reinstalling the suite.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from purchase to an ARMA REFORGER config you can reuse every session.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      { num: '01', phase: 'Before purchase', title: 'Check status', desc: 'Read the live banner on armacheats.org before you buy or launch.' },
      { num: '02', phase: 'Checkout', title: 'Complete checkout', desc: 'Use Buy Now to reach secure checkout and save your license email.' },
      { num: '03', phase: 'Loader', title: 'Launch & configure', desc: 'Load a conservative preset and tune aimbot smoothness plus ESP distance.' },
      { num: '04', phase: 'In-game', title: 'Save your config', desc: 'Rename and store the profile once sliders feel right for your main mode.' },
    ],
  },
  fieldNotes: {
    eyebrow: 'Field notes',
    title: 'Built for how ARMA REFORGER plays.',
    items: [
      { num: '01', title: 'Open-map awareness', desc: 'Distance ESP and weapon tags matter more on large maps—start with longer max distance, then tighten.' },
      { num: '02', title: 'Conservative aimbot', desc: 'Lower smoothness and smaller FOV first; raise only after you test recoil and movement.' },
      { num: '03', title: 'Config backups', desc: 'Duplicate configs before patch days so you can roll back if sliders reset.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'ARMA Cheats support',
    subtitle: 'Let us know how we can help.',
    channels: [
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Questions about Cloud DMA or features?',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Email support',
        desc: 'Loader, config, or checkout issues.',
        linkLabel: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, risk, and setup—before you buy.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
      {
        icon: 'messageCircle',
        title: 'Join Discord',
        desc: 'Community updates, setup help, and status notes from the team.',
        linkLabel: 'Join Discord',
        href: 'https://discord.com/invite/wmFY3xVtwm',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at secure checkout.' },
      { title: 'Platform', desc: 'Windows 10 or 11 and your ARMA REFORGER build version.' },
      { title: 'Error detail', desc: 'Screenshot or exact message from the loader or game.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, risk, and access—no vague promises.',
    items: [
      {
        num: '01',
        q: 'Where do I check if ARMA REFORGER cheats are online?',
        a: 'Use the status banner on armacheats.org before purchase or launch, especially after game updates.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Secure checkout unlocks portal access, loader download, and setup notes. Follow the guide before joining public servers.',
      },
      {
        num: '03',
        q: 'Can I get banned using third-party cheats?',
        a: 'Yes—online modifications carry risk. Anti-cheat and report systems change over time. Accept that risk before use.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'ARMA REFORGER on Windows 10/11 64-bit with the Cloud DMA setup described on the product page.',
      },
      {
        num: '05',
        q: 'Do you support recoil control?',
        a: 'This build focuses on aimbot and player ESP. Recoil-specific modules are not listed in the current feature set.',
      },
      {
        num: '06',
        q: 'Where is the product page?',
        a: 'The ARMA REFORGER suite lives at armacheats.org/products/arma-reforger-cheats/ with the full feature list and checkout.',
      },
    ],
  },
  footer: {
    tagline: 'ARMA REFORGER cheats — aimbot, ESP, and configs for PC. armacheats.org',
    explore: 'Explore',
    exploreLinks: [
      { href: '/', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { href: `${productBase}arma-reforger/`, label: 'ARMA REFORGER product', ariaLabel: 'Product' },
      { href: `${productBase}`, label: 'All products', ariaLabel: 'Products' },
      { href: '/blog/', label: 'Read guides', ariaLabel: 'Blog' },
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About ARMA Cheats',
      description: 'ARMA Cheats provides ARMA REFORGER feature guides, setup tips, and product information at armacheats.org.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'ARMA Cheats is a PC-focused resource for players exploring aimbot, player ESP, and configuration workflows in ARMA REFORGER. We publish guides and product details so you can evaluate features before checkout.',
            'Game names are used for identification only.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'Our site covers the ARMA REFORGER cheat suite, aimbot and ESP setup articles, and Cloud DMA compatibility notes. Content updates when feature lists or requirements change.',
            'Check armacheats.org status notes before every session.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Questions about compatibility, loader errors, or checkout go through email support. Include your order email, Windows version, and ARMA REFORGER build when opening a ticket.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'How ARMA Cheats handles analytics, cookies, and contact data when you use armacheats.org.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout happens on external pages—we do not store payment card data on armacheats.org.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us improve guides and fix broken links. Support tickets may retain the email and message content you provide until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: ['For privacy questions, use the Support page. Purchase rules are in our Terms & Conditions.'],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description: 'Purchase, license, refund, and use terms for ARMA Cheats products and armacheats.org.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: March 2026. By using armacheats.org or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell access to the ARMA REFORGER cheat suite delivered through an operator portal and loader for Windows.',
            'Feature lists on the product page describe what is included at the time of purchase. Modules can change when the game or anti-cheat systems update.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. armacheats.org does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes unless otherwise required by law or confirmed faults on our side on a supported setup.',
            'Contact support with order email, Windows version, game build, and exact error text if something fails on a supported configuration.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for online games can conflict with updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check status on armacheats.org before every session.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: ['For terms, billing, or loader questions, use the Support page. See also our Privacy Policy.'],
        },
      ],
    },
    support: {
      title: 'ARMA Cheats Support',
      description: 'Get support for loader, configs, and checkout questions at armacheats.org.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'ARMA Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Buy ARMA REFORGER cheats',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
};

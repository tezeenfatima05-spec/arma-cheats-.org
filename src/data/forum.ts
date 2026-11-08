export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Setup', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Configuration', tone: 'green', icon: 'settings' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: post.upvotes ?? 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

export function getAllForumSlugs(): string[] {
  return forumPosts.map((post) => post.slug);
}

export const forumPosts: ForumPost[] = [
  guideDiscussion({
    slug: 'which-aimbot-bone-for-arma-reforger',
    title: 'Which aimbot bone should I start with in ARMA REFORGER?',
    upvotes: 61,
    excerpt: 'Head vs body targeting when you first tune smoothness and FOV.',
    category: 'Guides & Setup',
    categoryTone: 'blue',
    sourceTitle: 'ARMA REFORGER aimbot setup',
    sourcePath: '/blog/arma-reforger-aimbot-setup/',
    answer:
      'Start with body or neck while you learn smoothness and FOV size. Move to head only after tracking feels stable at your preferred max distance.',
    detail: 'Pelvis can help on prone targets but overshoots on uneven terrain—test in a private session before live PvP.',
    tip: 'Save each bone choice as a separate config profile so you can A/B test without rebuilding sliders.',
  }),
  guideDiscussion({
    slug: 'how-to-reduce-esp-clutter',
    title: 'How do I reduce ESP clutter on large maps?',
    upvotes: 48,
    excerpt: 'Sample discussion on distance caps, box modes, and line-to-enemy toggles.',
    category: 'Configuration',
    categoryTone: 'green',
    sourceTitle: 'ARMA REFORGER ESP guide',
    sourcePath: '/blog/arma-reforger-esp-guide/',
    answer:
      'Disable line-to-enemy first, switch to corner boxes, and lower max distance until only relevant soldiers render.',
    detail: 'Gradient fill boxes read well at medium range; turn off background ESP style if fights happen mostly in cover.',
    tip: 'Rename configs by map size—open terrain needs longer distance than urban objectives.',
  }),
  guideDiscussion({
    slug: 'cloud-dma-prep-checklist',
    title: 'Cloud DMA prep checklist before first launch',
    upvotes: 37,
    excerpt: 'Demo checklist thread summarizing hardware verification steps.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Cloud DMA requirements',
    sourcePath: '/blog/arma-reforger-cloud-dma/',
    answer:
      'Verify OS build, admin rights, DMA firmware notes on the product page, and that ARMA REFORGER is fully patched.',
    detail: 'This is sample educational content—not a live user ticket log.',
    tip: 'Email support with your hardware summary if any compatibility line is unclear.',
  }),
  {
    slug: 'config-profile-naming-tips',
    category: 'Configuration',
    categoryTone: 'green',
    title: 'Naming config profiles for different game modes',
    excerpt: 'Sample tips for create, load, rename, and delete workflows.',
    author: 'config_helper',
    age: '4 days ago',
    commentsCount: 2,
    upvotes: 29,
    flair: 'Sample',
    body: [
      'Use short names tied to mode and range: conflict-long, seize-cqb, night-low-clutter.',
      'Duplicate a working profile before patch day instead of editing your only save.',
    ],
    comments: [
      {
        author: 'guide_team',
        age: '1 day ago',
        score: 5,
        body: 'See the config profiles blog post for the full create/load/rename flow.',
      },
    ],
    sourceTitle: 'Config profiles guide',
    sourcePath: '/blog/arma-reforger-config-profiles/',
  },
  {
    slug: 'show-team-toggle-squad-play',
    category: 'Guides & Setup',
    categoryTone: 'blue',
    title: 'When to enable show team in squad queues',
    excerpt: 'Sample notes on friendly markers during mixed squad play.',
    author: 'squad_ops',
    age: '5 days ago',
    commentsCount: 1,
    upvotes: 22,
    body: [
      'Enable show team when randos join your squad so team name ESP matches voice comms.',
      'Disable in small coordinated teams if you rely on uniform callouts only.',
    ],
    comments: [],
    sourceTitle: 'ESP guide',
    sourcePath: '/blog/arma-reforger-esp-guide/',
  },
];

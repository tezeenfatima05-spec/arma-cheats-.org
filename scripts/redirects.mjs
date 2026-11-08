/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/arma-reforger-cheats/'],
  ['/cheats/', '/products/arma-reforger-cheats/'],
  ['/cheats/lite', '/products/arma-reforger-cheats/'],
  ['/cheats/lite/', '/products/arma-reforger-cheats/'],
  ['/cheats/pro', '/products/arma-reforger-cheats/'],
  ['/cheats/pro/', '/products/arma-reforger-cheats/'],
  ['/cheats/elite', '/products/arma-reforger-cheats/arma-reforger/'],
  ['/cheats/elite/', '/products/arma-reforger-cheats/arma-reforger/'],
  ['/cheats/compare', '/blog/arma-reforger-aimbot-setup/'],
  ['/cheats/compare/', '/blog/arma-reforger-aimbot-setup/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

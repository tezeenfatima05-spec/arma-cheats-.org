/** Checkout destinations keyed by internal product id (no affiliate codes). */
export const CHECKOUT_URLS = {
  armaReforger:
    'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Farma-reforger',
  cloudDma: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fcloud-dma',
  hwidSpoofer: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fhwid-spoofer',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/arma-reforger', CHECKOUT_URLS.armaReforger],
  ['/go/arma-reforger/', CHECKOUT_URLS.armaReforger],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

/** Astro build redirects (trailing-slash paths only — avoids route collisions). */
export function checkoutRedirectsForAstro() {
  return Object.fromEntries(
    [...CHECKOUT_PATH_REDIRECTS.entries()]
      .filter(([route]) => route.endsWith('/') && route.length > 1)
      .map(([route, destination]) => [route, { status: 302, destination }]),
  );
}

/**
 * Cloudflare `_redirects` for paths without a trailing slash.
 * Trailing-slash `/go/.../` routes are handled by Astro redirects above.
 */
export function checkoutRedirectsFileLines() {
  return [...CHECKOUT_PATH_REDIRECTS.entries()]
    .filter(([route]) => !route.endsWith('/'))
    .map(([route, destination]) => `${route}  ${destination}  302`);
}

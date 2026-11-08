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
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
]);

export function resolveCheckoutPathRedirect(pathname) {
  let key = pathname;
  if (key.length > 1 && key.endsWith('/')) key = key.slice(0, -1);
  return CHECKOUT_PATH_REDIRECTS.get(key) ?? null;
}

/**
 * Cloudflare `_redirects` — one rule per path without trailing slash.
 * Workers treats `/go/x` and `/go/x/` as the same path (duplicate if both appear).
 */
export function checkoutRedirectsFileLines() {
  return [...CHECKOUT_PATH_REDIRECTS.entries()].map(
    ([route, destination]) => `${route}  ${destination}  302`,
  );
}

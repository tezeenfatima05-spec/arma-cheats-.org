import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  armaReforger: 'arma-reforger',
  cloudDma: 'cloud-dma',
  hwidSpoofer: 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal checkout path shown to users (hides external URL on hover). */
export function checkoutPath(product: CheckoutProduct = 'armaReforger'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** External Zadeyo checkout URL (same-tab Buy now on product cards). */
export function checkoutUrl(product: CheckoutProduct = 'armaReforger'): string {
  return CHECKOUT[product];
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('armaReforger');
export const PRIMARY_CHECKOUT_URL = checkoutUrl('armaReforger');

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'cloud-dma':
      return checkoutUrl('cloudDma');
    case 'hwid-spoofer':
      return checkoutUrl('hwidSpoofer');
    case 'arma-reforger':
    default:
      return checkoutUrl('armaReforger');
  }
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Farma-reforger') || href.includes('/products/arma-reforger')) {
    return checkoutPath('armaReforger');
  }
  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('cloudDma');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }

  return href;
}

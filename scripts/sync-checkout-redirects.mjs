/** Checkout redirects are written post-build via scripts/write-dist-redirects.mjs (not public/). */
import { checkoutRedirectsFileLines } from '../src/config/checkout-redirects.mjs';

console.log(
  `Checkout redirects: ${checkoutRedirectsFileLines().length} rule(s) (applied after astro build)`,
);

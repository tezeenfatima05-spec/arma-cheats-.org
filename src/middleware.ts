import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  // Production checkout: dist/client/_redirects on Workers (not middleware — avoids duplicate rules).
  if (import.meta.env.PROD) {
    return next();
  }
  const destination = resolveCheckoutPathRedirect(new URL(context.request.url).pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});

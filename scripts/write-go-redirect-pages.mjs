import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';

const slugs = [
  { dir: 'arma-reforger', url: CHECKOUT_URLS.armaReforger },
  { dir: 'cloud-dma', url: CHECKOUT_URLS.cloudDma },
  { dir: 'hwid-spoofer', url: CHECKOUT_URLS.hwidSpoofer },
];

for (const { dir, url } of slugs) {
  const dest = path.join(process.cwd(), 'public', 'go', dir);
  fs.mkdirSync(dest, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex,nofollow">
  <meta http-equiv="refresh" content="0;url=${url}">
  <title>Redirecting…</title>
  <script>location.replace(${JSON.stringify(url)})</script>
</head>
<body><p><a href="${url}">Continue to checkout</a></p></body>
</html>
`;
  fs.writeFileSync(path.join(dest, 'index.html'), html, 'utf8');
}

console.log(`[build] Wrote ${slugs.length} checkout redirect page(s) under public/go/`);

import fs from 'node:fs';
import path from 'node:path';

const publicRedirects = path.join(process.cwd(), 'public', '_redirects');
if (fs.existsSync(publicRedirects)) {
  fs.unlinkSync(publicRedirects);
  console.log('[build] Removed public/_redirects (Workers Static Assets — use HTML /go/ only)');
}

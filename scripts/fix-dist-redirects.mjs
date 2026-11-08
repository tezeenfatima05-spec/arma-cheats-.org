import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { writeWorkersRedirectsOnly } from './workers-redirects-body.mjs';

export function fixDistRedirects() {
  writeWorkersRedirectsOnly();
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  fixDistRedirects();
}

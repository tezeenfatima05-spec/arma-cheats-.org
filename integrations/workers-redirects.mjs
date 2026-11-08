import { wipeDistOutput, writeWorkersRedirectsOnly } from '../scripts/workers-redirects-body.mjs';

/** Runs inside `astro build` so Wrangler cannot skip it when it overwrites package.json. */
export default function workersRedirectsIntegration() {
  return {
    name: '@site/workers-redirects',
    hooks: {
      'astro:build:start': () => {
        wipeDistOutput();
      },
      'astro:build:done': () => {
        writeWorkersRedirectsOnly();
      },
    },
  };
}

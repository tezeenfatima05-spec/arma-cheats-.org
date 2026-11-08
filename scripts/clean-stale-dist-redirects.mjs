import { wipeDistOutput } from './workers-redirects-body.mjs';

/** Workers Builds restores `dist/` from cache; wipe entire output before every build. */
wipeDistOutput();

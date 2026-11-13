import { spawnSync } from 'node:child_process';
import { DEV_HOST, DEV_ORIGIN, DEV_PORT } from '../src/config/dev-server.mjs';

console.log(`[dev] ${DEV_ORIGIN}/ (port ${DEV_PORT}, host ${DEV_HOST})`);

const hostFlag = DEV_HOST === '0.0.0.0' ? '0.0.0.0' : DEV_HOST;
const result = spawnSync(
  'npx',
  ['astro', 'dev', '--host', hostFlag, '--port', String(DEV_PORT)],
  { stdio: 'inherit', shell: true },
);
process.exit(result.status ?? 1);

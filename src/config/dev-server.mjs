import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile() {
  const file = path.join(process.cwd(), '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile();

/** Local dev — port 7847 avoids clashes with 3000/4321/5173 on other sites. Override via .env */
export const DEV_PORT = Number(process.env.PORT) || 7847;
export const DEV_HOST = process.env.HOST?.trim() || '127.0.0.1';

const raw = process.env.DEV_ORIGIN?.trim().replace(/\/$/, '');
export const DEV_ORIGIN = raw || `http://127.0.0.1:${DEV_PORT}`;

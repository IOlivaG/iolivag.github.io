import { existsSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'cv', 'IsaacOlivaCV.pdf');
const destination = resolve(root, 'public', 'IsaacOlivaCV.pdf');

if (!existsSync(source)) {
  console.log('[sync-cv] cv/IsaacOlivaCV.pdf not found; skipping (using the committed public copy).');
  process.exit(0);
}

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
console.log('[sync-cv] Copied cv/IsaacOlivaCV.pdf -> public/IsaacOlivaCV.pdf');

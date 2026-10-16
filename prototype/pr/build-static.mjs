// Generated output only; runtime sources and fonts remain in their original locations.
import { readFile, mkdir, writeFile, rm, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const output = fileURLToPath(new URL('./dist/', import.meta.url));
const appFiles = ['index.html', 'styles.css', 'app.mjs', 'data/seed.json',
  'logic/pr-session.mjs', 'logic/validation.mjs', 'logic/metrics.mjs', 'logic/time.mjs'];
const fontFiles = ['BeVietnamPro-Regular.ttf', 'BeVietnamPro-Medium.ttf',
  'BeVietnamPro-SemiBold.ttf', 'BeVietnamPro-Bold.ttf', 'OFL.txt'];
const sources = [
  ...appFiles.map(name => [name, new URL(name, import.meta.url)]),
  ...fontFiles.map(name => [`fonts/${name}`, new URL(`../../wireframes/pr/${name}`, import.meta.url)]),
];

// Read every required source before touching output. Missing sources fail the build.
const files = await Promise.all(sources.map(async ([name, source]) => [name, await readFile(source)]));
const existing = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
});
if (existing && (!existing.isDirectory() || existing.isSymbolicLink())) {
  throw new Error('dist must be a regular generated directory');
}
// output is fixed to the dist child of this script; never accepts a deletion target.
await rm(output, { recursive: true, force: true });
for (const [name, bytes] of files) {
  const target = join(output, name);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, bytes);
}
console.log(`Static package: ${output} (${files.length} files)`);

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, readFile, readdir, writeFile, unlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const run = promisify(execFile);
test('static package is exact, reproducible, and fails before replacing output if source is missing', async t => {
  const root = await mkdtemp(join(tmpdir(), 'pr-static-package-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const app = ['index.html', 'styles.css', 'app.mjs', 'data/seed.json',
    'logic/pr-session.mjs', 'logic/validation.mjs', 'logic/metrics.mjs', 'logic/time.mjs'];
  const fonts = ['BeVietnamPro-Regular.ttf', 'BeVietnamPro-Medium.ttf',
    'BeVietnamPro-SemiBold.ttf', 'BeVietnamPro-Bold.ttf', 'OFL.txt'];
  for (const name of ['build-static.mjs', ...app, ...fonts.map(n => `../../wireframes/pr/${n}`)]) {
    const destination = join(root, 'prototype/pr', name);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(new URL(`../${name}`, import.meta.url), destination);
  }
  const build = join(root, 'prototype/pr/build-static.mjs');
  const dist = join(root, 'prototype/pr/dist');
  const expected = [...app, ...fonts.map(n => `fonts/${n}`)].sort();
  const verify = async () => {
    const actual = (await readdir(dist, { recursive: true, withFileTypes: true }))
      .filter(entry => entry.isFile())
      .map(entry => join(entry.parentPath, entry.name).slice(dist.length + 1).replaceAll('\\', '/')).sort();
    assert.deepEqual(actual, expected);
    for (const name of expected) {
      const source = name.startsWith('fonts/') ? `../../wireframes/pr/${name.slice(6)}` : name;
      assert.deepEqual(await readFile(join(dist, name)), await readFile(join(root, 'prototype/pr', source)), name);
    }
  };
  await run(process.execPath, [build]);
  await verify();
  await writeFile(join(dist, 'stale.txt'), 'must disappear');
  await run(process.execPath, [build]);
  await verify();
  await unlink(join(root, 'prototype/pr/data/seed.json'));
  await assert.rejects(run(process.execPath, [build]));
  assert.deepEqual(await readFile(join(dist, 'data/seed.json')),
    await readFile(new URL('../data/seed.json', import.meta.url)));
  await rm(dist, { recursive: true });
  await assert.rejects(run(process.execPath, [build]));
  await assert.rejects(readFile(join(dist, 'index.html')), { code: 'ENOENT' });
});

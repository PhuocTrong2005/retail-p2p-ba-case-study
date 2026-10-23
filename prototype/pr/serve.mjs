import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname, sep } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const fontRoot = resolve(root, '../../wireframes/pr');
const appFiles = ['index.html', 'styles.css', 'app.mjs', 'data/seed.json',
  'data/po-catalog.json', 'logic/pr-session.mjs', 'logic/validation.mjs', 'logic/metrics.mjs', 'logic/time.mjs',
  'logic/session-context.mjs', 'logic/p2p-session.mjs', 'logic/po-session.mjs', 'logic/receiving-invoice.mjs', 'logic/matching-payment.mjs', 'data/matching-scenarios.json'];
const fontFiles = ['BeVietnamPro-Regular.ttf', 'BeVietnamPro-Medium.ttf', 'BeVietnamPro-SemiBold.ttf', 'BeVietnamPro-Bold.ttf', 'OFL.txt'];
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.mjs':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8' };
export function createStaticServer() {
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, { Allow:'GET, HEAD' }); res.end(); return; }
    let pathname;
    try { pathname = decodeURIComponent(req.url.split('?')[0]); } catch { res.writeHead(400); res.end(); return; }
    if (pathname === '/') pathname = '/index.html';
    const relative = pathname.slice(1);
    const font = pathname.startsWith('/fonts/') && fontFiles.includes(pathname.slice(7));
    const allowed = appFiles.includes(relative);
    if (!font && !allowed) { res.writeHead(404); res.end(); return; }
    const base = font ? fontRoot : root;
    const target = resolve(base, font ? pathname.slice(7) : relative);
    try {
      const actual = await realpath(target);
      const canonicalBase = await realpath(base);
      if (!actual.startsWith(canonicalBase + sep)) { res.writeHead(403); res.end(); return; }
      const body = await readFile(actual);
      res.writeHead(200, { 'Content-Type': mime[actual.slice(actual.lastIndexOf('.'))], 'Content-Length':body.length });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404); res.end(); }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.argv.find(a => a.startsWith('--port='))?.split('=')[1] ?? 8080);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new RangeError('Port must be 1..65535');
  const server = createStaticServer();
  server.on('error', error => { console.error(`${error.code}: cannot bind 127.0.0.1:${port}; choose another --port, do not stop other processes.`); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`PR prototype: http://127.0.0.1:${port}/`));
}

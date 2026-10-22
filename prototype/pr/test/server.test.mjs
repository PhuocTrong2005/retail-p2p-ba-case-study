import test from 'node:test';
import assert from 'node:assert/strict';
import { request } from 'node:http';
import { createStaticServer } from '../serve.mjs';

async function withServer(t) {
  const server=createStaticServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  return (path,method='GET')=>new Promise((resolve,reject)=>{
    const req=request({host:'127.0.0.1',port:server.address().port,path,method,agent:false},res=>{
      const parts=[]; res.on('data',p=>parts.push(p)); res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(parts)}));
    }); req.on('error',reject); req.end();
  });
}
test('static server serves only listed application files with correct MIME',async t=>{
  const get=await withServer(t);
  for (const [path,mime] of [['/','text/html'],['/styles.css','text/css'],['/app.mjs','text/javascript'],['/logic/pr-session.mjs','text/javascript'],['/logic/session-context.mjs','text/javascript'],['/logic/p2p-session.mjs','text/javascript'],['/logic/po-session.mjs','text/javascript'],['/logic/receiving-invoice.mjs','text/javascript'],['/data/seed.json','application/json'],['/data/po-catalog.json','application/json']]) {
    const r=await get(path); assert.equal(r.status,200); assert.ok(r.headers['content-type'].startsWith(mime)); assert.ok(r.body.length);
  }
});
test('font allowlist reuses local files and license',async t=>{
  const get=await withServer(t);
  for (const name of ['Regular','Medium','SemiBold','Bold']) {
    const r=await get(`/fonts/BeVietnamPro-${name}.ttf`); assert.equal(r.status,200); assert.equal(r.headers['content-type'],'font/ttf');
  }
  assert.equal((await get('/fonts/OFL.txt')).status,200);
});
test('server blocks traversal, repository, source tests and malformed encoding',async t=>{
  const get=await withServer(t);
  for (const path of ['/.git/config','/../README.md','/%2e%2e/README.md','/fonts/../README.md','/fonts/%2e%2e%2fREADME.md','/%5c..%5cREADME.md','/serve.mjs','/test/session.test.mjs','/README.md','/wireframes/pr/index.html']) assert.equal((await get(path)).status,404,path);
  assert.equal((await get('/%ZZ')).status,400);
});
test('server is read-only and HEAD returns headers without body',async t=>{
  const get=await withServer(t);
  for (const method of ['POST','PUT','DELETE']) assert.equal((await get('/data/seed.json',method)).status,405);
  const r=await get('/','HEAD'); assert.equal(r.status,200); assert.equal(r.body.length,0); assert.ok(+r.headers['content-length']>0);
});

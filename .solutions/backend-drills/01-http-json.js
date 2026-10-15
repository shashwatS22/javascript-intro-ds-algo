import http from 'node:http';

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    res.writeHead(404);
    res.end();
  });
}

// ---- CHECK (do not edit below) ----
const server = createServer();
server.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


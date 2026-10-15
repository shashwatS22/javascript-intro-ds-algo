import express from 'express';

export function createApp() {
  const app = express();
  app.get('/search', (req, res) => {
    res.type('text/plain').send(req.query.q ?? '');
  });
  return app;
}

// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/search?q=ada`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


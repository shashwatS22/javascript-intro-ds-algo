import express from 'express';

export function createApp() {
  const app = express();
  app.use((req, res, next) => {
    if (req.get('x-api-key') !== 'secret') {
      res.status(401).type('text/plain').send('unauthorized');
      return;
    }
    next();
  });
  app.get('/', (_req, res) => {
    res.type('text/plain').send('ok');
  });
  return app;
}

// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const base = `http://127.0.0.1:${port}`;
    const bad = await fetch(base);
    console.log(bad.status);
    console.log(await bad.text());
    const good = await fetch(base, { headers: { 'x-api-key': 'secret' } });
    console.log(good.status);
    console.log(await good.text());
  } finally {
    server.close();
  }
});


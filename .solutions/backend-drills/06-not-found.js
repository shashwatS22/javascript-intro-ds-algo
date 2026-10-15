import express from 'express';

export function createApp() {
  const app = express();
  app.use((_req, res) => {
    res.status(404).json({ error: 'not found' });
  });
  return app;
}

// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/missing`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


import express from 'express';

export function createApp() {
  const app = express();
  const api = express.Router();
  api.get('/health', (_req, res) => {
    res.type('text/plain').send('ok');
  });
  app.use('/api', api);
  return app;
}

// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


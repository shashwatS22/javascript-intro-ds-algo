/**
 * backend-drills / 07-middleware
 *
 * TASK
 * Middleware requires header `x-api-key: secret`. Otherwise respond 401 with plain text `unauthorized`. With the key, `GET /` returns `ok`.
 *
 * EXPECTED OUTPUT
 * 401
 * unauthorized
 * 200
 * ok
 */

import express from 'express';

export function createApp() {
  const app = express();
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


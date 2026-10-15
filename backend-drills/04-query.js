/**
 * backend-drills / 04-query
 *
 * TASK
 * Export `createApp()`. `GET /search` reads query `q` and responds with its value as plain text.
 *
 * EXPECTED OUTPUT
 * 200
 * ada
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
    const res = await fetch(`http://127.0.0.1:${port}/search?q=ada`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


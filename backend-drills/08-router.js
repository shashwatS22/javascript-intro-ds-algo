/**
 * backend-drills / 08-router
 *
 * TASK
 * Mount an `express.Router` at `/api`. `GET /api/health` returns plain text `ok`.
 *
 * EXPECTED OUTPUT
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
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


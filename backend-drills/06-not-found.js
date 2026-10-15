/**
 * backend-drills / 06-not-found
 *
 * TASK
 * Unknown routes return status 404 and JSON `{"error":"not found"}`.
 *
 * EXPECTED OUTPUT
 * 404
 * {"error":"not found"}
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
    const res = await fetch(`http://127.0.0.1:${port}/missing`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


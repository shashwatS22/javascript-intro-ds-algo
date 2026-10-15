/**
 * backend-drills / 03-route-params
 *
 * TASK
 * Export `createApp()`. `GET /users/:id` responds with the id as plain text.
 *
 * EXPECTED OUTPUT
 * 200
 * 42
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
    const res = await fetch(`http://127.0.0.1:${port}/users/42`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


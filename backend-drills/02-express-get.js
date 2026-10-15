/**
 * backend-drills / 02-express-get
 *
 * TASK
 * Export `createApp()` returning an Express app. `GET /hello` responds with text `hi`.
 *
 * EXPECTED OUTPUT
 * 200
 * hi
 */

import express from 'express';

export function createApp() {
  const app = express();
  // GET /hello
  return app;
}


// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/hello`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


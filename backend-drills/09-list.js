/**
 * backend-drills / 09-list
 *
 * TASK
 * In-memory `items` (seed below). `GET /items` returns the JSON array.
 *
 * EXPECTED OUTPUT
 * 200
 * [{"id":1,"name":"Alpha"},{"id":2,"name":"Beta"}]
 */

import express from 'express';

const items = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
];

export function createApp() {
  const app = express();
  return app;
}


// ---- CHECK (do not edit below) ----
const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/items`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


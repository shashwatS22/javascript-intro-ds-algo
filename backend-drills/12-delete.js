/**
 * backend-drills / 12-delete
 *
 * TASK
 * Seed `items` below. `DELETE /items/:id` returns 204. Then `GET /items` lists remaining items as JSON.
 *
 * EXPECTED OUTPUT
 * 204
 * [{"id":2,"name":"Beta"}]
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
    const base = `http://127.0.0.1:${port}`;
    const del = await fetch(`${base}/items/1`, { method: 'DELETE' });
    console.log(del.status);
    const list = await fetch(`${base}/items`);
    console.log(await list.text());
  } finally {
    server.close();
  }
});


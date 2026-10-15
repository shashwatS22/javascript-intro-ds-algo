/**
 * backend-drills / 10-create
 *
 * TASK
 * Seed `items` below. `POST /items` with JSON `{ name }` appends `{ id, name }` (next id) and returns 201 with the new item.
 *
 * EXPECTED OUTPUT
 * 201
 * 3
 * Gamma
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
    const res = await fetch(`http://127.0.0.1:${port}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Gamma' }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data.id);
    console.log(data.name);
  } finally {
    server.close();
  }
});


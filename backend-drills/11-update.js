/**
 * backend-drills / 11-update
 *
 * TASK
 * Seed `items` below. `PUT /items/:id` updates `name` from JSON body and returns the updated item JSON.
 *
 * EXPECTED OUTPUT
 * 200
 * Updated
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
    const res = await fetch(`http://127.0.0.1:${port}/items/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated' }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data.name);
  } finally {
    server.close();
  }
});


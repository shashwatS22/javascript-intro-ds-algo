/**
 * backend-drills / 05-post-json
 *
 * TASK
 * Use `express.json()`. `POST /notes` accepts JSON `{ title }`, responds 201 with the note JSON.
 *
 * EXPECTED OUTPUT
 * 201
 * Hi
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
    const res = await fetch(`http://127.0.0.1:${port}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hi' }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data.title);
  } finally {
    server.close();
  }
});


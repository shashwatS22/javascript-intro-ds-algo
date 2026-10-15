/**
 * backend-drills / 01-http-json
 *
 * TASK
 * Export `createServer()` returning an `http.Server`. `GET /` must respond with status 200 and body `{"ok":true}`.
 *
 * EXPECTED OUTPUT
 * 200
 * {"ok":true}
 */

import http from 'node:http';

export function createServer() {
  // handle GET /
}


// ---- CHECK (do not edit below) ----
const server = createServer();
server.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});


import express from 'express';

const items = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
];

export function createApp() {
  const app = express();
  app.use(express.json());
  app.post('/items', (req, res) => {
    const id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const item = { id, name: req.body.name };
    items.push(item);
    res.status(201).json(item);
  });
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


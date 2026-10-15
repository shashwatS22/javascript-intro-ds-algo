import express from 'express';

const items = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
];

export function createApp() {
  const app = express();
  app.use(express.json());
  app.put('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((i) => i.id === id);
    if (!item) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    item.name = req.body.name;
    res.json(item);
  });
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


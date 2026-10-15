import express from 'express';

const items = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
];

export function createApp() {
  const app = express();
  app.get('/items', (_req, res) => {
    res.json(items);
  });
  app.delete('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    items.splice(idx, 1);
    res.status(204).end();
  });
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


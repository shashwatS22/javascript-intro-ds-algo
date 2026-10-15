import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const drillsDir = path.join(root, 'backend-drills');
const solDir = path.join(root, '.solutions', 'backend-drills');

const EXPRESS_CHECK = (fn) => `
// ---- CHECK (do not edit below) ----
${fn}
`;

function header(file, task, expected) {
  return `/**
 * backend-drills / ${file}
 *
 * TASK
 * ${task}
 *
 * EXPECTED OUTPUT
 * ${expected.split('\n').join('\n * ')}
 */

`;
}

function runNode(file) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [file], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (c) => (stdout += c));
    child.stderr.on('data', (c) => (stderr += c));
    child.on('close', (code) => resolve({ stdout, stderr, code }));
    child.on('error', reject);
  });
}

const SEED_ITEMS = `const items = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
];`;

const DRILLS = [
  {
    file: '01-http-json',
    task: 'Export `createServer()` returning an `http.Server`. `GET /` must respond with status 200 and body `{"ok":true}`.',
    stub: `import http from 'node:http';

export function createServer() {
  // handle GET /
}

`,
    solution: `import http from 'node:http';

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    res.writeHead(404);
    res.end();
  });
}
`,
    check: `const server = createServer();
server.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
    useCreateServer: true,
  },
  {
    file: '02-express-get',
    task: 'Export `createApp()` returning an Express app. `GET /hello` responds with text `hi`.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  // GET /hello
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.get('/hello', (_req, res) => {
    res.type('text/plain').send('hi');
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/hello\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '03-route-params',
    task: 'Export `createApp()`. `GET /users/:id` responds with the id as plain text.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.get('/users/:id', (req, res) => {
    res.type('text/plain').send(req.params.id);
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/users/42\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '04-query',
    task: 'Export `createApp()`. `GET /search` reads query `q` and responds with its value as plain text.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.get('/search', (req, res) => {
    res.type('text/plain').send(req.query.q ?? '');
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/search?q=ada\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '05-post-json',
    task: 'Use `express.json()`. `POST /notes` accepts JSON `{ title }`, responds 201 with the note JSON.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.post('/notes', (req, res) => {
    const note = { title: req.body.title };
    res.status(201).json(note);
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/notes\`, {
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
`,
  },
  {
    file: '06-not-found',
    task: 'Unknown routes return status 404 and JSON `{"error":"not found"}`.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.use((_req, res) => {
    res.status(404).json({ error: 'not found' });
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/missing\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '07-middleware',
    task: 'Middleware requires header `x-api-key: secret`. Otherwise respond 401 with plain text `unauthorized`. With the key, `GET /` returns `ok`.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  app.use((req, res, next) => {
    if (req.get('x-api-key') !== 'secret') {
      res.status(401).type('text/plain').send('unauthorized');
      return;
    }
    next();
  });
  app.get('/', (_req, res) => {
    res.type('text/plain').send('ok');
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const base = \`http://127.0.0.1:\${port}\`;
    const bad = await fetch(base);
    console.log(bad.status);
    console.log(await bad.text());
    const good = await fetch(base, { headers: { 'x-api-key': 'secret' } });
    console.log(good.status);
    console.log(await good.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '08-router',
    task: 'Mount an `express.Router` at `/api`. `GET /api/health` returns plain text `ok`.',
    stub: `import express from 'express';

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

export function createApp() {
  const app = express();
  const api = express.Router();
  api.get('/health', (_req, res) => {
    res.type('text/plain').send('ok');
  });
  app.use('/api', api);
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/api/health\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '09-list',
    task: 'In-memory `items` (seed below). `GET /items` returns the JSON array.',
    stub: `import express from 'express';

${SEED_ITEMS}

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

${SEED_ITEMS}

export function createApp() {
  const app = express();
  app.get('/items', (_req, res) => {
    res.json(items);
  });
  return app;
}
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/items\`);
    console.log(res.status);
    console.log(await res.text());
  } finally {
    server.close();
  }
});
`,
  },
  {
    file: '10-create',
    task: 'Seed `items` below. `POST /items` with JSON `{ name }` appends `{ id, name }` (next id) and returns 201 with the new item.',
    stub: `import express from 'express';

${SEED_ITEMS}

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

${SEED_ITEMS}

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
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/items\`, {
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
`,
  },
  {
    file: '11-update',
    task: 'Seed `items` below. `PUT /items/:id` updates `name` from JSON body and returns the updated item JSON.',
    stub: `import express from 'express';

${SEED_ITEMS}

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

${SEED_ITEMS}

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
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const res = await fetch(\`http://127.0.0.1:\${port}/items/1\`, {
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
`,
  },
  {
    file: '12-delete',
    task: 'Seed `items` below. `DELETE /items/:id` returns 204. Then `GET /items` lists remaining items as JSON.',
    stub: `import express from 'express';

${SEED_ITEMS}

export function createApp() {
  const app = express();
  return app;
}

`,
    solution: `import express from 'express';

${SEED_ITEMS}

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
`,
    check: `const app = createApp();
const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const base = \`http://127.0.0.1:\${port}\`;
    const del = await fetch(\`\${base}/items/1\`, { method: 'DELETE' });
    console.log(del.status);
    const list = await fetch(\`\${base}/items\`);
    console.log(await list.text());
  } finally {
    server.close();
  }
});
`,
  },
];

async function writeDrill(drill) {
  const checkBlock = EXPRESS_CHECK(drill.check);
  const solPath = path.join(solDir, `${drill.file}.js`);
  const solBody = drill.solution + checkBlock;
  await fs.mkdir(solDir, { recursive: true });
  await fs.writeFile(solPath, solBody, 'utf8');

  const { stdout, stderr, code } = await runNode(solPath);
  if (code !== 0) {
    throw new Error(`${drill.file} solution failed: ${stderr || stdout}`);
  }
  const expected = stdout.replace(/\r\n/g, '\n').replace(/\n+$/, '');

  const stubBody = drill.stub + checkBlock;
  await fs.mkdir(drillsDir, { recursive: true });
  await fs.writeFile(
    path.join(drillsDir, `${drill.file}.js`),
    header(drill.file, drill.task, expected) + stubBody,
    'utf8',
  );
  await fs.writeFile(path.join(drillsDir, `${drill.file}.expected.txt`), `${expected}\n`, 'utf8');
}

async function main() {
  await fs.mkdir(drillsDir, { recursive: true });
  await fs.writeFile(
    path.join(drillsDir, 'README.md'),
    `# Backend drills (Node + Express)

Build small HTTP APIs. Each file exports \`createApp()\` (or \`createServer()\` in drill 01). **Do not edit** the \`CHECK\` block at the bottom — it starts a server, calls it with \`fetch\`, and prints the result.

Start after level 15 (async). Progress here does not block JavaScript levels.

\`\`\`bash
npm run dev
npm run check backend-drills/02-express-get
\`\`\`

| # | Topic |
|---|---|
| 01 | Raw \`node:http\` + JSON |
| 02–04 | Express GET, params, query |
| 05–06 | POST JSON, 404 handler |
| 07–08 | Middleware, Router |
| 09–12 | In-memory REST CRUD |
`,
    'utf8',
  );

  for (const drill of DRILLS) {
    await writeDrill(drill);
    console.log(`  ${drill.file}`);
  }
  console.log('\nDone — 12 backend drills generated.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

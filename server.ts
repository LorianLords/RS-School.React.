import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { NextFunction, Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { setupStore } from './src/store';
import { RickAndMortyApi } from './src/Features/FetchApi';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 5173;
async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      template = await vite.transformIndexHtml(url, template);

      const parts = template.split('<!--app-html-->');

      const store = setupStore();
      store.dispatch(RickAndMortyApi.endpoints.getCharacters.initiate(''));
      await Promise.all(store.dispatch(RickAndMortyApi.util.getRunningQueriesThunk()));

      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

      const stream = await render(url, store, {
        ohShellReady() {
          res.write(parts[0]);
          stream.pipe(res);
        },
        onAllReady() {
          res.write(
            parts[1] +
              `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
                /</g,
                '\\u003c'
              )}</script>`
          );
          res.end();
        },
      });
    } catch (err) {
      const e = err as Error;
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
}

createServer();

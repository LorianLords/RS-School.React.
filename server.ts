import path from 'path';
import { fileURLToPath } from 'url';
import express, { NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import * as fs from 'fs';
import { createStore, PreloadedState } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      template = await vite.transformIndexHtml(url, template);

      const parts = template.split('<!--app-html-->');

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      const [{ pipe }, store] = await render(url, {
        ohShellReady() {
          res.write(parts[0]);
          pipe(res);
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
      /* const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);*/
    } catch (err) {
      const e = err as Error;
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () => {
    `listening on http://localhost:${5173}\``;
  });
}

createServer();

import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

import fs from 'fs';
import kuralsRouter from './server/routes/kurals';
import legalRouter from './server/routes/legal';
import scenariosRouter from './server/routes/scenarios';
import progressRouter from './server/routes/progress';
import badgesRouter from './server/routes/badges';
import leaderboardRouter from './server/routes/leaderboard';
import knowledgeGraphRouter from './server/routes/knowledgeGraph';
import retrievalRouter from './server/routes/retrieval';
import forumRouter from './server/routes/forum';
import healthRouter from './server/routes/health';
import { DatasetPreprocessor } from './server/preprocessing/datasetPreprocessor';

dotenv.config();

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Initialize data preprocessing pipeline
  console.log('[Justice AI Server] Booting dataset ingestion and indexing engine...');
  DatasetPreprocessor.getInstance();

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Routes FIRST
  app.use('/api/health', healthRouter);
  app.use('/api/datasets', healthRouter);
  app.use('/api/kurals', kuralsRouter);
  app.use('/api/legal', legalRouter);
  app.use('/api/scenarios', scenariosRouter);
  app.use('/api/progress', progressRouter);
  app.use('/api/badges', badgesRouter);
  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/knowledge-graph', knowledgeGraphRouter);
  app.use('/api/retrieval', retrievalRouter);
  app.use('/api/forum', forumRouter);
  app.use('/api', retrievalRouter); // Mounts /api/ai-tutor/query

  // Vite middleware for development vs Static serving for production
  const distIndex = path.join(process.cwd(), 'dist', 'index.html');
  const isProductionMode = process.env.NODE_ENV === 'production' || fs.existsSync(distIndex);

  if (!isProductionMode) {
    // Intercept /@vite/client to provide a resilient, zero-error HMR client in cloud preview/container environments
    app.get('/@vite/client', (_req, res) => {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.send(`
class SafeHMRContext {
  constructor(ownerPath) {
    this.ownerPath = ownerPath;
    this.data = {};
  }
  accept(deps, cb) {
    if (typeof deps === 'function') {
      try { deps(); } catch (_) {}
    } else if (typeof cb === 'function') {
      try { cb([]); } catch (_) {}
    }
  }
  acceptDeps(deps, cb) {
    if (typeof cb === 'function') {
      try { cb([]); } catch (_) {}
    }
  }
  dispose(cb) {}
  prune(cb) {}
  decline() {}
  invalidate() {}
  on(event, cb) {}
  off(event, cb) {}
  send(event, data) {}
}

export function createHotContext(ownerPath) {
  return new SafeHMRContext(ownerPath);
}

export function updateStyle(id, content) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.id = id;
    document.head.appendChild(style);
  }
  style.textContent = content;
}

export function removeStyle(id) {
  const style = document.getElementById(id);
  if (style && style.parentNode) {
    style.parentNode.removeChild(style);
  }
}

export function injectQuery(url, queryToInject) {
  if (!url) return url;
  return url.includes('?') ? url + '&' + queryToInject : url + '?' + queryToInject;
}

export function prunePaths(paths) {}

export class ErrorOverlay extends HTMLElement {}
if (typeof customElements !== 'undefined' && !customElements.get('vite-error-overlay')) {
  customElements.define('vite-error-overlay', ErrorOverlay);
}
      `);
    });

    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server }
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Justice AI Server] Running on http://0.0.0.0:${PORT} (Node: ${process.version})`);
  });
}

startServer().catch((err) => {
  console.error('[Justice AI Server] Failed to start server:', err);
  process.exit(1);
});

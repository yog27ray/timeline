import { Express } from 'express';

import { ParseServerGenerator } from './parse-server-generator';

function registerRoutes(app: Express): void {
  app.get('/api/health', (req, res) => res.json({ message: 'success' }));
  // parse route
  app.use('/api/parse', ParseServerGenerator.generate());
}

export { registerRoutes };

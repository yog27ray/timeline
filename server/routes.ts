import { Express } from 'express';

import { ParseServerGenerator } from './parse-server-generator';

function registerRoutes(app: Express): void {
  // parse route
  app.use('/api/parse', ParseServerGenerator.generate());
}

export { registerRoutes };

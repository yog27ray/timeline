/**
 * Main application file
 */
import express, { Express } from 'express';
import http from 'http';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import { Logger } from './components/logger';
import config from './config/environment';
import { expressConfig } from './config/express';
import { registerRoutes } from './routes';

const log = Logger.instance('App');

// Setup server
const app = express() as Express & {
  angularFullstack: { close(): void; },
  setUpServer(): Promise<unknown>;
  stopServer(): Promise<void>;
  startServer(): Promise<string>;
};
const server = http.createServer(app);

app.stopServer = (): Promise<void> => {
  app.angularFullstack.close();
  delete app.angularFullstack;
  return Promise.resolve();
};
// Start server
app.startServer = (): Promise<string> => {
  if (app.angularFullstack) {
    return Promise.resolve('Server Already Running');
  }
  return new Promise((resolve: (value?: string) => void): void => {
    // wait for parse server to initialize
    app.angularFullstack = server.listen(config.port, config.ip, () => {
      log.debug('Express server listening on %d, in %s mode', config.port, app.get('env'));
      resolve('completed');
    });
  });
};

app.setUpServer = (): Promise<unknown> => new Promise((resolve: (value?: unknown) => void, reject: (error: unknown) => void): void => {
  expressConfig(app);
  registerRoutes(app);
  app.startServer()
    .then(() => resolve())
    .catch((error: unknown) => reject(error));
});

app.setUpServer().catch((err: any) => log.error(err));

// Expose app
export { app };

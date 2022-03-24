/**
 * Express configuration
 */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Express } from 'express';
import morgan from 'morgan';
import path from 'path';
import { env as appEnv } from './env';
import config from './environment';

function expressConfig(app: Express): void {
  const env: string = app.get('env');

  if (['development', 'test'].includes(env)) {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath') as string));
  if (env !== 'test' && appEnv.ENABLE_MORGAN === 'true') {
    app.use(morgan('dev'));
  }

  app.set('views', `${appEnv.root}/server/src/views`);
  app.set('view engine', 'pug');
  const whitelist = appEnv.WHITELISTED_DOMAINS.split(',').filter((each: string) => each);
  const corsOptions = {
    origin: (origin: string, callback: any): void => {
      if (origin === 'null' || !origin || !whitelist.length || whitelist.includes(origin)) {
        callback(undefined, true);
      } else {
        callback(new Error(`UnAuthorized Access from ${origin}`));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '10MB', type: 'text/plain' }));
  app.use(bodyParser.json({ limit: '10MB' }));
  app.use(cookieParser());
  app.use(errorHandler()); // Error handler - has to be last
}

export { expressConfig };

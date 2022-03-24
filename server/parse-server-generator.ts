import { RequestHandler } from 'express';
import fs from 'fs';
import { ParseServer } from 'parse-server';
import { env } from './config/env';

class ParseServerGenerator {
  static generate(): RequestHandler {
    const parseServerConfig: any = {
      databaseURI: env.MONGODB_URI,
      appId: env.PARSE_APP_ID,
      masterKey: env.PARSE_MASTER_KEY,
      serverURL: `${env.PARSE_SERVER_URL}/api/parse`,
      push: {},
      auth: {},
      idempotencyOptions: {
        paths: ['.*'], // enforce for all requests
        ttl: 120, // keep request IDs for 120s
      },
    };

    const ext = __filename.split('.').pop();
    parseServerConfig.cloud = `${env.root}/server/cloud/main.${ext}`;

    parseServerConfig.databaseOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    if (env.ssl.db.enable) {
      parseServerConfig.databaseOptions = {
        ...parseServerConfig.databaseOptions,
        socketTimeoutMS: 20000,
        ssl: true,
        sslValidate: true,
        sslCA: fs.readFileSync(env.ssl.db.ca),
        sslCert: fs.readFileSync(env.ssl.db.cert),
        sslKey: fs.readFileSync(env.ssl.db.key),
      };
    }

    switch (process.env.NODE_ENV) {
      case 'production': {
        parseServerConfig.logLevel = 'error';
        break;
      }
      default:
    }
    return new ParseServer(parseServerConfig);
  }
}
export { ParseServerGenerator };

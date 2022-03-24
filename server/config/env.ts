import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const root = path.normalize(`${__dirname}/../..`);
const envFile = ['test', 'ci'].includes(process.env.NODE_ENV) ? path.join(root, 'default.env') : path.join(root, '.env');
const setupCompleted = fs.existsSync(envFile);
const variables = setupCompleted ? dotenv.config({ path: envFile }) : dotenv.config({ path: path.join(root, 'default.env') });

const rawEnv: any = { ...(variables.parsed || variables), ...process.env };

// tslint:disable-next-line:class-name
class env {
  static root: string = root;
  static MONGODB_URI: string = rawEnv.MONGODB_URI;
  static PARSE_MASTER_KEY: string = rawEnv.PARSE_MASTER_KEY;
  static PARSE_SERVER_URL: string = rawEnv.PARSE_SERVER_URL;
  static PARSE_APP_ID: string = rawEnv.PARSE_APP_ID;
  static WHITELISTED_EMAIL_DOMAIN: string = rawEnv.WHITELISTED_EMAIL_DOMAIN || '';
  static ENABLE_MORGAN: string = rawEnv.ENABLE_MORGAN;
  static WHITELISTED_DOMAINS: string = rawEnv.WHITELISTED_DOMAINS || '';
  static ssl = {
    db: {
      cert: rawEnv.SSL_DB_CERT as string,
      key: rawEnv.SSL_DB_KEY as string,
      ca: rawEnv.SSL_DB_CA as string,
      enable: rawEnv.SSL_ENABLE === 'true',
    },
  };
}

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export { env };

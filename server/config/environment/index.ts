/* eslint no-process-env:0 */
import path from 'path';

/* function requiredProcessEnv(name) {
 if(!process.env[name]) {
 throw new Error('You must set the ' + name + ' environment variable');
 }
 return process.env[name];
 } */
// interface EnvJson {
//   env: string;
//   root: string;
//   clientPort: number;
//   port: number;
//   ip: string;
//   seedDB: boolean;
//   secrets: unknown;
//   mongo: unknown;
// }
// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../../..`),

  // dev client port
  clientPort: Number(process.env.CLIENT_PORT) || 3000,

  // Server port
  port: Number(process.env.PORT) || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'heallo-doctor-secret',
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true,
      },
    },
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
// tslint:disable-next-line:no-default-export
export default all; // eslint-disable-line

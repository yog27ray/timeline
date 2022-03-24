"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const root = path.normalize(`${__dirname}/../..`);
const envFile = ['test', 'ci'].includes(process.env.NODE_ENV) ? path.join(root, 'default.env') : path.join(root, '.env');
const setupCompleted = fs.existsSync(envFile);
const variables = setupCompleted ? dotenv_1.default.config({ path: envFile }) : dotenv_1.default.config({ path: path.join(root, 'default.env') });
const rawEnv = { ...(variables.parsed || variables), ...process.env };
// tslint:disable-next-line:class-name
class env {
}
exports.env = env;
env.root = root;
env.MONGODB_URI = rawEnv.MONGODB_URI;
env.PARSE_MASTER_KEY = rawEnv.PARSE_MASTER_KEY;
env.PARSE_SERVER_URL = rawEnv.PARSE_SERVER_URL;
env.PARSE_APP_ID = rawEnv.PARSE_APP_ID;
env.WHITELISTED_EMAIL_DOMAIN = rawEnv.WHITELISTED_EMAIL_DOMAIN || '';
env.ENABLE_MORGAN = rawEnv.ENABLE_MORGAN;
env.WHITELISTED_DOMAINS = rawEnv.WHITELISTED_DOMAINS || '';
env.ssl = {
    db: {
        cert: rawEnv.SSL_DB_CERT,
        key: rawEnv.SSL_DB_KEY,
        ca: rawEnv.SSL_DB_CA,
        enable: rawEnv.SSL_ENABLE === 'true',
    },
};
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//# sourceMappingURL=env.js.map
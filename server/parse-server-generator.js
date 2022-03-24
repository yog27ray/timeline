"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseServerGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const parse_server_1 = require("parse-server");
const env_1 = require("./config/env");
class ParseServerGenerator {
    static generate() {
        const parseServerConfig = {
            databaseURI: env_1.env.MONGODB_URI,
            appId: env_1.env.PARSE_APP_ID,
            masterKey: env_1.env.PARSE_MASTER_KEY,
            serverURL: `${env_1.env.PARSE_SERVER_URL}/api/parse`,
            push: {},
            auth: {},
            idempotencyOptions: {
                paths: ['.*'],
                ttl: 120, // keep request IDs for 120s
            },
        };
        const ext = __filename.split('.').pop();
        parseServerConfig.cloud = `${env_1.env.root}/server/cloud/main.${ext}`;
        parseServerConfig.databaseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        if (env_1.env.ssl.db.enable) {
            parseServerConfig.databaseOptions = {
                ...parseServerConfig.databaseOptions,
                socketTimeoutMS: 20000,
                ssl: true,
                sslValidate: true,
                sslCA: fs_1.default.readFileSync(env_1.env.ssl.db.ca),
                sslCert: fs_1.default.readFileSync(env_1.env.ssl.db.cert),
                sslKey: fs_1.default.readFileSync(env_1.env.ssl.db.key),
            };
        }
        switch (process.env.NODE_ENV) {
            case 'production': {
                parseServerConfig.logLevel = 'error';
                break;
            }
            default:
        }
        return new parse_server_1.ParseServer(parseServerConfig);
    }
}
exports.ParseServerGenerator = ParseServerGenerator;
//# sourceMappingURL=parse-server-generator.js.map
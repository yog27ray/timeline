"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressConfig = void 0;
/**
 * Express configuration
 */
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
const environment_1 = __importDefault(require("./environment"));
function expressConfig(app) {
    const env = app.get('env');
    if (['development', 'test'].includes(env)) {
        app.use(express_1.default.static(path_1.default.join(environment_1.default.root, '.tmp')));
    }
    app.set('appPath', path_1.default.join(environment_1.default.root, 'client'));
    app.use(express_1.default.static(app.get('appPath')));
    if (env !== 'test' && env_1.env.ENABLE_MORGAN === 'true') {
        app.use((0, morgan_1.default)('dev'));
    }
    app.set('views', `${env_1.env.root}/server/src/views`);
    app.set('view engine', 'pug');
    const whitelist = env_1.env.WHITELISTED_DOMAINS.split(',').filter((each) => each);
    const corsOptions = {
        origin: (origin, callback) => {
            if (origin === 'null' || !origin || !whitelist.length || whitelist.includes(origin)) {
                callback(undefined, true);
            }
            else {
                callback(new Error(`UnAuthorized Access from ${origin}`));
            }
        },
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json({ limit: '10MB', type: 'text/plain' }));
    app.use(body_parser_1.default.json({ limit: '10MB' }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, errorhandler_1.default)()); // Error handler - has to be last
}
exports.expressConfig = expressConfig;
//# sourceMappingURL=express.js.map
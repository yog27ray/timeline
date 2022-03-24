"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/**
 * Main application file
 */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// tslint:disable-next-line:no-import-side-effect
require("reflect-metadata");
const logger_1 = require("./components/logger");
const environment_1 = __importDefault(require("./config/environment"));
const express_2 = require("./config/express");
const routes_1 = require("./routes");
const log = logger_1.Logger.instance('App');
// Setup server
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
app.stopServer = () => {
    app.angularFullstack.close();
    delete app.angularFullstack;
    return Promise.resolve();
};
// Start server
app.startServer = () => {
    if (app.angularFullstack) {
        return Promise.resolve('Server Already Running');
    }
    return new Promise((resolve) => {
        // wait for parse server to initialize
        app.angularFullstack = server.listen(environment_1.default.port, environment_1.default.ip, () => {
            log.debug('Express server listening on %d, in %s mode', environment_1.default.port, app.get('env'));
            resolve('completed');
        });
    });
};
app.setUpServer = () => new Promise((resolve, reject) => {
    (0, express_2.expressConfig)(app);
    (0, routes_1.registerRoutes)(app);
    app.startServer()
        .then(() => resolve())
        .catch((error) => reject(error));
});
app.setUpServer().catch((err) => log.error(err));
//# sourceMappingURL=app.js.map
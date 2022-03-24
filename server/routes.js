"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const parse_server_generator_1 = require("./parse-server-generator");
function registerRoutes(app) {
    // parse route
    app.use('/api/parse', parse_server_generator_1.ParseServerGenerator.generate());
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=routes.js.map
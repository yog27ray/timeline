"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// tslint:disable-next-line:no-import-side-effect
require("../../config/env");
// tslint:disable-next-line:ordered-imports
const logger4node_1 = require("logger4node");
const Logger = new logger4node_1.Logger4Node('timeline');
exports.Logger = Logger;
//# sourceMappingURL=index.js.map
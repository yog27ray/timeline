"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const acl_roles_1 = require("../../cloud/acl/acl.roles");
const container = new inversify_1.Container({ autoBindInjectable: true });
exports.container = container;
container.bind(acl_roles_1.ACLRoles).toSelf().inSingletonScope();
//# sourceMappingURL=index.js.map
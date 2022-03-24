"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHooks = void 0;
const inversify_1 = require("inversify");
const acl_update_1 = require("../acl/acl-update");
const role_helper_1 = require("../acl/role.helper");
const security_helper_1 = require("../security.helper");
let UserHooks = class UserHooks {
    initialize() {
        this.beforeSave();
        this.afterSave();
    }
    beforeSave() {
        this.securityHelper.authenticatedBeforeSave(Table.User, async (req) => {
            await this.aclUpdate.user(req.object);
        });
    }
    afterSave() {
        this.securityHelper.afterSave(Table.User, async (req) => {
            if (req.object.get('createdAt').getTime() === req.object.get('updatedAt').getTime()) {
                await this.roleHelper.addToUserRole(req.object);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(security_helper_1.SecurityHelper),
    __metadata("design:type", security_helper_1.SecurityHelper)
], UserHooks.prototype, "securityHelper", void 0);
__decorate([
    (0, inversify_1.inject)(acl_update_1.AclUpdate),
    __metadata("design:type", acl_update_1.AclUpdate)
], UserHooks.prototype, "aclUpdate", void 0);
__decorate([
    (0, inversify_1.inject)(role_helper_1.RoleHelper),
    __metadata("design:type", role_helper_1.RoleHelper)
], UserHooks.prototype, "roleHelper", void 0);
UserHooks = __decorate([
    (0, inversify_1.injectable)()
], UserHooks);
exports.UserHooks = UserHooks;
//# sourceMappingURL=user.hooks.js.map
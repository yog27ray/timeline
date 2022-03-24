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
exports.AclUpdate = void 0;
const inversify_1 = require("inversify");
const acl_builder_1 = require("./acl-builder");
const acl_roles_1 = require("./acl.roles");
const role_helper_1 = require("./role.helper");
let AclUpdate = class AclUpdate {
    async post(post) {
        await this.roleHelper.fetchOrCreateSystemRoles();
        post.setACL(new acl_builder_1.AclBuilder(post.getACL(), this.aclRoles.adminRole)
            .disablePublicReadWrite()
            .enableReadOnlyAccessForRole(this.aclRoles.userRole)
            .build());
    }
    async user(user) {
        await this.roleHelper.fetchOrCreateSystemRoles();
        user.setACL(new acl_builder_1.AclBuilder(user.getACL(), this.aclRoles.adminRole)
            .disablePublicReadWrite()
            .enableReadOnlyAccessForRole(this.aclRoles.userRole)
            .build());
    }
};
__decorate([
    (0, inversify_1.inject)(role_helper_1.RoleHelper),
    __metadata("design:type", role_helper_1.RoleHelper)
], AclUpdate.prototype, "roleHelper", void 0);
__decorate([
    (0, inversify_1.inject)(acl_roles_1.ACLRoles),
    __metadata("design:type", acl_roles_1.ACLRoles)
], AclUpdate.prototype, "aclRoles", void 0);
AclUpdate = __decorate([
    (0, inversify_1.injectable)()
], AclUpdate);
exports.AclUpdate = AclUpdate;
//# sourceMappingURL=acl-update.js.map
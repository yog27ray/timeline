"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AclBuilder = void 0;
class AclBuilder {
    constructor(acl, adminRole) {
        this.acl = acl || new Parse.ACL();
        this.enableReadWriteAccessForRole(adminRole);
    }
    enablePublicReadOnly() {
        this.acl.setPublicReadAccess(true);
        this.acl.setPublicWriteAccess(false);
        return this;
    }
    disablePublicReadWrite() {
        this.acl.setPublicReadAccess(false);
        this.acl.setPublicWriteAccess(false);
        return this;
    }
    enableReadWriteAccessForRole(role) {
        this.acl.setRoleWriteAccess(role, true);
        this.acl.setRoleReadAccess(role, true);
        return this;
    }
    enableReadOnlyAccessForRole(role) {
        this.acl.setRoleWriteAccess(role, false);
        this.acl.setRoleReadAccess(role, true);
        return this;
    }
    enableReadWriteAccessForUser(user) {
        this.acl.setReadAccess(user.id, true);
        this.acl.setWriteAccess(user.id, true);
        return this;
    }
    enableReadOnlyAccessForUser(user) {
        this.acl.setReadAccess(user.id, true);
        this.acl.setWriteAccess(user.id, false);
        return this;
    }
    build() {
        return this.acl;
    }
}
exports.AclBuilder = AclBuilder;
//# sourceMappingURL=acl-builder.js.map
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
var RoleHelper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHelper = void 0;
const inversify_1 = require("inversify");
const d_b_query_1 = require("../../components/d-b-query/d-b-query");
const timeline_error_1 = require("../../components/errors/timeline-error");
const security_helper_1 = require("../security.helper");
const acl_roles_1 = require("./acl.roles");
let RoleHelper = RoleHelper_1 = class RoleHelper {
    async fetchOrCreateSystemRoles() {
        await this.fetchOrCreateAdminRole();
        await this.fetchOrCreateRoleEditorRole();
        await this.fetchOrCreateUserRole();
    }
    async fetchOrCreateAdminRole() {
        if (!this.aclRoles.adminRole) {
            this.aclRoles.adminRole = await this.findOrCreateRole('admin');
        }
    }
    async findOrCreateRole(roleName) {
        const role = await this.findRole(roleName);
        if (!role) {
            try {
                return await this.createAndSaveRole(roleName);
            }
            catch (error) {
                const { code, message } = error;
                if (code === 137 && message === 'A duplicate value for a field with unique values was provided') {
                    return this.findOrCreateRole(roleName);
                }
                await Promise.reject(error);
            }
        }
        return role;
    }
    async findRole(roleName) {
        const roleQuery = new Parse.Query(Parse.Role);
        roleQuery.equalTo('name', roleName);
        return roleQuery.first({ useMasterKey: true });
    }
    async createAndSaveRole(roleName) {
        const role = new Parse.Role(roleName, new Parse.ACL());
        await this.updateRole(role);
        return role.save({}, { useMasterKey: true });
    }
    async findOrCreateUserRole(u) {
        if (!u) {
            throw new timeline_error_1.TimelineError({ type: 'ERROR_USER_NOT_PRESENT', code: 412, message: 'User is undefined.' });
        }
        const user = await this.dbQuery.fetchObject(u, 'username', { useMasterKey: true });
        const rolePrefix = 'u_';
        const roleName = `${rolePrefix}${user.get('username')}`;
        const role = await this.findRole(roleName);
        if (role) {
            return role;
        }
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        acl.setRoleWriteAccess(this.aclRoles.adminRole, true);
        acl.setRoleReadAccess(this.aclRoles.adminRole, true);
        const newRole = new Parse.Role(roleName, acl);
        newRole.getUsers().add(user);
        try {
            return await newRole.save({}, { useMasterKey: true });
        }
        catch (error) {
            const userRole = await this.findRole(roleName);
            if (userRole) {
                return userRole;
            }
            throw error;
        }
    }
    async fetchOrCreateRoleEditorRole() {
        if (!this.aclRoles.roleEditor) {
            this.aclRoles.roleEditor = await this.findOrCreateRole('roleEditor');
        }
    }
    async fetchOrCreateUserRole() {
        if (!this.aclRoles.userRole) {
            this.aclRoles.userRole = await this.findOrCreateRole('userRole');
        }
    }
    async updateRole(role) {
        switch (role.get('name')) {
            case 'admin': {
                break;
            }
            case 'roleEditor': {
                await this.fetchOrCreateAdminRole();
                break;
            }
            default:
                await this.fetchOrCreateAdminRole();
                await this.fetchOrCreateRoleEditorRole();
        }
        let roleAcl = role.get('ACL');
        if (!roleAcl) {
            roleAcl = new Parse.ACL();
        }
        roleAcl.setPublicReadAccess(false);
        roleAcl.setPublicWriteAccess(false);
        if (role.get('name') !== 'admin') {
            roleAcl.setRoleWriteAccess(this.aclRoles.adminRole, true);
            roleAcl.setRoleReadAccess(this.aclRoles.adminRole, true);
        }
        if (!RoleHelper_1.MAIN_ROLES.includes(role.get('name'))) {
            roleAcl.setRoleWriteAccess(this.aclRoles.roleEditor, true);
            roleAcl.setRoleReadAccess(this.aclRoles.roleEditor, true);
        }
        roleAcl.setRoleReadAccess(role, true);
        roleAcl.setRoleWriteAccess(role, false);
        role.set('ACL', roleAcl);
    }
    async addToUserRole(user) {
        const option = this.securityHelper.getMasterOption({});
        await this.aclRoles.userRole.fetch(option);
        this.aclRoles.userRole.getUsers().add(user);
        await this.aclRoles.userRole.save({}, option);
    }
};
RoleHelper.MAIN_ROLES = ['roleEditor', 'admin', 'userRole'];
__decorate([
    (0, inversify_1.inject)(security_helper_1.SecurityHelper),
    __metadata("design:type", security_helper_1.SecurityHelper)
], RoleHelper.prototype, "securityHelper", void 0);
__decorate([
    (0, inversify_1.inject)(acl_roles_1.ACLRoles),
    __metadata("design:type", acl_roles_1.ACLRoles)
], RoleHelper.prototype, "aclRoles", void 0);
__decorate([
    (0, inversify_1.inject)(d_b_query_1.DBQuery),
    __metadata("design:type", d_b_query_1.DBQuery)
], RoleHelper.prototype, "dbQuery", void 0);
RoleHelper = RoleHelper_1 = __decorate([
    (0, inversify_1.injectable)()
], RoleHelper);
exports.RoleHelper = RoleHelper;
//# sourceMappingURL=role.helper.js.map
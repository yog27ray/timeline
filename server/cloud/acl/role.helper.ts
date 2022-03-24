import { inject, injectable } from 'inversify';
import { DBQuery } from '../../components/d-b-query/d-b-query';
import { TimelineError } from '../../components/errors/timeline-error';
import { SecurityHelper } from '../security.helper';
import { ACLRoles } from './acl.roles';

@injectable()
class RoleHelper {
  private static MAIN_ROLES: Array<string> = ['roleEditor', 'admin', 'userRole'];

  @inject(SecurityHelper) private securityHelper: SecurityHelper;
  @inject(ACLRoles) private aclRoles: ACLRoles;
  @inject(DBQuery) private dbQuery: DBQuery;

  async fetchOrCreateSystemRoles(): Promise<any> {
    await this.fetchOrCreateAdminRole();
    await this.fetchOrCreateRoleEditorRole();
    await this.fetchOrCreateUserRole();
  }

  async fetchOrCreateAdminRole(): Promise<any> {
    if (!this.aclRoles.adminRole) {
      this.aclRoles.adminRole = await this.findOrCreateRole('admin');
    }
  }

  async findOrCreateRole(roleName: string): Promise<any> {
    const role = await this.findRole(roleName);
    if (!role) {
      try {
        return await this.createAndSaveRole(roleName);
      } catch (error) {
        const { code, message } = error as { code: number; message: string; };
        if (code === 137 && message === 'A duplicate value for a field with unique values was provided') {
          return this.findOrCreateRole(roleName);
        }
        await Promise.reject(error);
      }
    }
    return role;
  }

  async findRole(roleName: string): Promise<any> {
    const roleQuery = new Parse.Query(Parse.Role);
    roleQuery.equalTo('name', roleName);
    return roleQuery.first({ useMasterKey: true });
  }

  async createAndSaveRole(roleName: string): Promise<any> {
    const role = new Parse.Role(roleName, new Parse.ACL());
    await this.updateRole(role);
    return role.save({}, { useMasterKey: true });
  }

  async findOrCreateUserRole(u: any): Promise<any> {
    if (!u) {
      throw new TimelineError({ type: 'ERROR_USER_NOT_PRESENT', code: 412, message: 'User is undefined.' });
    }
    const user = await this.dbQuery.fetchObject(u, 'username', { useMasterKey: true }) as Table.User;
    const rolePrefix = 'u_';
    const roleName = `${rolePrefix}${user.get('username')}`;
    const role = await this.findRole(roleName);
    if (role) { return role; }
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);

    acl.setRoleWriteAccess(this.aclRoles.adminRole, true);
    acl.setRoleReadAccess(this.aclRoles.adminRole, true);
    const newRole = new Parse.Role(roleName, acl);
    newRole.getUsers().add(user);

    try {
      return await newRole.save({}, { useMasterKey: true });
    } catch (error) {
      const userRole = await this.findRole(roleName);
      if (userRole) { return userRole; }
      throw error;
    }
  }

  async fetchOrCreateRoleEditorRole(): Promise<any> {
    if (!this.aclRoles.roleEditor) {
      this.aclRoles.roleEditor = await this.findOrCreateRole('roleEditor');
    }
  }

  async fetchOrCreateUserRole(): Promise<any> {
    if (!this.aclRoles.userRole) {
      this.aclRoles.userRole = await this.findOrCreateRole('userRole');
    }
  }

  async updateRole(role: Table.Role): Promise<any> {
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

    if (!roleAcl) { roleAcl = new Parse.ACL(); }

    roleAcl.setPublicReadAccess(false);
    roleAcl.setPublicWriteAccess(false);

    if (role.get('name') !== 'admin') {
      roleAcl.setRoleWriteAccess(this.aclRoles.adminRole, true);
      roleAcl.setRoleReadAccess(this.aclRoles.adminRole, true);
    }

    if (!RoleHelper.MAIN_ROLES.includes(role.get('name') as string)) {
      roleAcl.setRoleWriteAccess(this.aclRoles.roleEditor, true);
      roleAcl.setRoleReadAccess(this.aclRoles.roleEditor, true);
    }

    roleAcl.setRoleReadAccess(role, true);
    roleAcl.setRoleWriteAccess(role, false);

    role.set('ACL', roleAcl);
  }

  async addToUserRole(user: Table.User): Promise<void> {
    const option = this.securityHelper.getMasterOption({});
    await this.aclRoles.userRole.fetch(option);
    this.aclRoles.userRole.getUsers().add(user);
    await this.aclRoles.userRole.save({}, option);
  }
}

export { RoleHelper };

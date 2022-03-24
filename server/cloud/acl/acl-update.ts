import { inject, injectable } from 'inversify';
import { AclBuilder } from './acl-builder';
import { ACLRoles } from './acl.roles';
import { RoleHelper } from './role.helper';

@injectable()
export class AclUpdate {
  @inject(RoleHelper) private roleHelper: RoleHelper;
  @inject(ACLRoles) private aclRoles: ACLRoles;

  async post(post: Table.Post): Promise<void> {
    await this.roleHelper.fetchOrCreateSystemRoles();
    post.setACL(new AclBuilder(post.getACL(), this.aclRoles.adminRole)
      .disablePublicReadWrite()
      .enableReadOnlyAccessForRole(this.aclRoles.userRole)
      .build());
  }

  async user(user: Table.User): Promise<void> {
    await this.roleHelper.fetchOrCreateSystemRoles();
    user.setACL(new AclBuilder(user.getACL(), this.aclRoles.adminRole)
      .disablePublicReadWrite()
      .enableReadOnlyAccessForRole(this.aclRoles.userRole)
      .build());
  }
}

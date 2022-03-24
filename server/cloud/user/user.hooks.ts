import { inject, injectable } from 'inversify';
import { AclUpdate } from '../acl/acl-update';
import { RoleHelper } from '../acl/role.helper';
import { SecurityHelper } from '../security.helper';

@injectable()
export class UserHooks {
  @inject(SecurityHelper) private securityHelper: SecurityHelper;
  @inject(AclUpdate) private aclUpdate: AclUpdate;
  @inject(RoleHelper) private roleHelper: RoleHelper;

  initialize(): void {
    this.beforeSave();
    this.afterSave();
  }

  private beforeSave(): void {
    this.securityHelper.authenticatedBeforeSave(Table.User, async req => {
      await this.aclUpdate.user(req.object);
    });
  }

  private afterSave(): void {
    this.securityHelper.afterSave(Table.User, async req => {
      if (req.object.get('createdAt').getTime() === req.object.get('updatedAt').getTime()) {
        await this.roleHelper.addToUserRole(req.object);
      }
    });
  }
}

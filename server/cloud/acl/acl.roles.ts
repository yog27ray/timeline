import { injectable } from 'inversify';

@injectable()
class ACLRoles {
  adminRole: Parse.Role;

  roleEditor: Parse.Role;

  userRole: Parse.Role;
}

export { ACLRoles };

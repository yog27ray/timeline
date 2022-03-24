export class AclBuilder {
  private readonly acl: Parse.ACL;

  constructor(acl: Parse.ACL, adminRole: Parse.Role) {
    this.acl = acl || new Parse.ACL();
    this.enableReadWriteAccessForRole(adminRole);
  }

  enablePublicReadOnly(): AclBuilder {
    this.acl.setPublicReadAccess(true);
    this.acl.setPublicWriteAccess(false);
    return this;
  }

  disablePublicReadWrite(): AclBuilder {
    this.acl.setPublicReadAccess(false);
    this.acl.setPublicWriteAccess(false);
    return this;
  }

  enableReadWriteAccessForRole(role: Parse.Role): AclBuilder {
    this.acl.setRoleWriteAccess(role, true);
    this.acl.setRoleReadAccess(role, true);
    return this;
  }

  enableReadOnlyAccessForRole(role: Parse.Role): AclBuilder {
    this.acl.setRoleWriteAccess(role, false);
    this.acl.setRoleReadAccess(role, true);
    return this;
  }

  enableReadWriteAccessForUser(user: Table.User): AclBuilder {
    this.acl.setReadAccess(user.id, true);
    this.acl.setWriteAccess(user.id, true);
    return this;
  }
  enableReadOnlyAccessForUser(user: Table.User): AclBuilder {
    this.acl.setReadAccess(user.id, true);
    this.acl.setWriteAccess(user.id, false);
    return this;
  }

  build(): Parse.ACL {
    return this.acl;
  }
}

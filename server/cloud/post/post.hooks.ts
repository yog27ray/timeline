import { inject, injectable } from 'inversify';
import { Table } from '../../components/d-b-query/table';
import { AclUpdate } from '../acl/acl-update';
import { SecurityHelper } from '../security.helper';
import { PostHelper } from './post.helper';

@injectable()
export class PostHooks {
  @inject(SecurityHelper) private securityHelper: SecurityHelper;
  @inject(PostHelper) private postHelper: PostHelper;
  @inject(AclUpdate) private aclUpdate: AclUpdate;

  initialize(): void {
    this.beforeSave();
  }

  private beforeSave(): void {
    this.securityHelper.authenticatedBeforeSave(Table.Post, async (req) => {
      this.postHelper.addUser(req.object, req.user);
      this.postHelper.validation(req.object);
      this.postHelper.updateEventTime(req.object);
      await this.aclUpdate.post(req.object);
    });
  }
}

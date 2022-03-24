import { ParseClassExtender } from 'mongo-to-parse/server';
import { UserTable } from './class/user';
import { ParseModelType } from './parse-model';
import { PostTable } from './class/post';
import { RoleTable } from './class/role';

declare global {
  declare type ParseKeys<T extends ParseClassExtender> = keyof T['attributes'];
  declare type ParseKeyValue<T extends ParseClassExtender> = { [key in keyof T['attributes']]?: T['attributes'][key] };

  namespace Table {
    const User: UserTable = UserTable;
    type User = UserTable;
    const Post: PostTable = PostTable;
    type Post = PostTable;
    const Role: RoleTable = RoleTable;
    type Role = RoleTable;

    namespace Cloud {
      interface FunctionRequest extends Parse.Cloud.FunctionRequest {
        user: User;
        ip: string;
        context: { [key: string]: unknown };
      }
      interface BeforeSaveRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.BeforeSaveRequest {
        user: User;
        object: Z;
        original: Z;
      }
      interface BeforeDeleteRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.BeforeDeleteRequest {
        user: User;
        object: Z;
      }
      interface AfterDeleteRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.AfterDeleteRequest {
        user: User;
        object: Z;
      }
      interface AfterSaveRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.AfterSaveRequest {
        user: User;
        object: Z;
        original: Z;
      }
      interface BeforeFindRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.BeforeFindRequest {
        user: User;
        query: Parse.Query<Z>;
        context: { [key: string]: unknown };
      }
      interface AfterFindRequest <T extends Parse.Attributes, Z extends ParseClassExtender<T>> extends Parse.Cloud.AfterFindRequest {
        user: User;
        objects: Array<Z>;
        context: { [key: string]: unknown };
      }
    }
  }
}

export { ParseModelType };

// tslint:disable-next-line:no-import-side-effect
import 'parse-server';

export class Table {
  static User = Parse.User as unknown as Table.User;
  static Role = Parse.Role;
  static Post = Parse.Object.extend('Post') as Table.Post;
}

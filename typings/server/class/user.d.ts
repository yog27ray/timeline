// <reference path="../../index.d.ts" />

declare type UserObject<T extends Parse.Attributes> = Parse.User<T & Parse.BaseAttributes> & (new () => UserObject<T>);

declare type UserTable = UserObject<{
  username: string;
  name: string;
  email: string;
  photo: string;
}>;

export { UserTable };

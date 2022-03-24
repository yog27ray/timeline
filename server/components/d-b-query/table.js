"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
// tslint:disable-next-line:no-import-side-effect
require("parse-server");
class Table {
}
exports.Table = Table;
Table.User = Parse.User;
Table.Role = Parse.Role;
Table.Post = Parse.Object.extend('Post');
//# sourceMappingURL=table.js.map
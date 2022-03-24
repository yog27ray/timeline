// <reference path="../../index.d.ts" />

import { ParseClassExtender } from 'mongo-to-parse/server';
import { UserTable } from './user';

declare type PostTable = ParseClassExtender<{
  user: UserTable;
  description: string;
  title: string;
  category: string;
  eventTime: Date;
}>;

export { PostTable };

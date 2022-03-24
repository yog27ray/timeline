import { decorate, injectable } from 'inversify';
import { MongoToParseQuery, MongoToParseQueryBase } from 'mongo-to-parse/server';
import { Table } from './table';

decorate(injectable(), MongoToParseQuery);
decorate(injectable(), MongoToParseQueryBase);

// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
global.Table = Table;

@injectable()
class DBQuery extends MongoToParseQuery {
}

export { DBQuery };

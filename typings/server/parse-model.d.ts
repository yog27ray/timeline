// <reference path="../index.d.ts" />

import { ParseClassExtender } from 'mongo-to-parse/server';

declare namespace ParseModelType {
  type ParseFunctionCallbackFunction = (req: Table.Cloud.FunctionRequest, option: Parse.FullOptions) => Promise<any>;
  type ParseBeforeDeleteCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.BeforeDeleteRequest<T, Z>, option: Parse.FullOptions) => Promise<any>;
  type ParseBeforeSaveCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.BeforeSaveRequest<T, Z>, option: Parse.FullOptions) => Promise<any>;
  type ParseBeforeFindCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.BeforeFindRequest<T, Z>, option: Parse.FullOptions) => Promise<any>;
  type ParseAfterDeleteCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.AfterDeleteRequest<T, Z>, option: Parse.FullOptions) => Promise<any>;
  type ParseAfterFindCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.AfterFindRequest<T, Z>, option: Parse.FullOptions) => Promise<Array<Parse.Object>>;
  type ParseAfterSaveCallbackFunction<T extends Parse.Attributes, Z extends ParseClassExtender<T>> = (
    req: Table.Cloud.AfterSaveRequest<T, Z>, option: Parse.FullOptions) => Promise<any>;
  type LoginModule = { validateAuthData: (authData: Parse.AuthData) => Promise<void>; validateAppId: () => Promise<void> };
}

export { ParseModelType };

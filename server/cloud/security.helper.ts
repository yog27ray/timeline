import { injectable } from 'inversify';
import { ParseClassExtender } from 'mongo-to-parse/server';
import { ParseModelType } from '../../typings';
import { TimelineError } from '../components/errors/timeline-error';

declare type Callback = (req: unknown, option: Parse.FullOptions) => Promise<any>;

@injectable()
class SecurityHelper {
  isAuthenticatedRequest(request: any): boolean {
    return !!(request.user || request.master);
  }

  getOption(request: any): Parse.FullOptions {
    const option: Parse.FullOptions = { useMasterKey: !!request.master };
    if (request.user) {
      option.sessionToken = request.user.getSessionToken();
    }
    return option;
  }

  authenticatedCloudFunction(name: string, callback: ParseModelType.ParseFunctionCallbackFunction): void {
    Parse.Cloud.define(name, async (req: Parse.Cloud.FunctionRequest) => {
      if (!this.isAuthenticatedRequest(req)) {
        throw new Parse.Error(401, 'Unauthorized Access.');
      }
      return this.handleCallback(req, callback as Callback);
    });
  }

  unauthenticatedCloudFunction(name: string, callback: ParseModelType.ParseFunctionCallbackFunction): void {
    Parse.Cloud.define(name, (req: any) => this.handleCallback(req, callback as Callback));
  }

  authenticatedBeforeSave<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseBeforeSaveCallbackFunction<T, Z>): void {
    Parse.Cloud.beforeSave(new Table().className, async (req: any) => {
      if (!this.isAuthenticatedRequest(req)) {
        throw new Parse.Error(401, 'Unauthorized Access.');
      }
      return this.handleCallback(req, callback as Callback);
    });
  }

  unauthenticatedBeforeSave<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseBeforeSaveCallbackFunction<T, Z>): void {
    Parse.Cloud.beforeSave(new Table().className, (req: any) => this.handleCallback(req, callback as Callback));
  }

  authenticatedBeforeDelete<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseBeforeDeleteCallbackFunction<T, Z>): void {
    Parse.Cloud.beforeDelete(new Table().className, async (req: any) => {
      if (!this.isAuthenticatedRequest(req)) {
        throw new Parse.Error(401, 'Unauthorized Access.');
      }
      return this.handleCallback(req, callback as Callback);
    });
  }

  authenticatedBeforeFind<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseBeforeFindCallbackFunction<T, Z>): void {
    Parse.Cloud.beforeFind(new Table().className, async (req: any) => {
      if (!this.isAuthenticatedRequest(req)) {
        throw new Parse.Error(401, 'Unauthorized Access.');
      }
      return this.handleCallback(req, callback as Callback);
    });
  }

  afterSave<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseAfterSaveCallbackFunction<T, Z>): void {
    Parse.Cloud.afterSave(new Table().className, (req: any) => this.handleCallback(req, callback as Callback));
  }

  afterDelete<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseAfterDeleteCallbackFunction<T, Z>): void {
    Parse.Cloud.afterDelete(new Table().className, (req: any) => this.handleCallback(req, callback as Callback));
  }

  afterFind<T extends Parse.Attributes, Z extends ParseClassExtender<T>>(
    Table: Z,
    callback: ParseModelType.ParseAfterFindCallbackFunction<T, Z>): void {
    Parse.Cloud.afterFind(new Table().className, (req: any) => this.handleCallback(req, callback as Callback));
  }

  getMasterOption(option: Parse.FullOptions): Parse.FullOptions {
    return { ...option, useMasterKey: true };
  }

  isMasterKeyUsed(req: any): void {
    if (this.getOption(req).useMasterKey) {
      return;
    }
    throw new TimelineError({ code: 401, message: 'Only master key can perform this action', type: 'ERROR_NO_MASTER_KEY' });
  }

  private async handleCallback(request: any, callback: Callback): Promise<any> {
    try {
      return (await callback(request, this.getOption(request)));
    } catch (error) {
      const { code, message } = error as TimelineError;
      throw new Parse.Error(code || 400, message);
    }
  }
}

export { SecurityHelper };

import { injectable } from 'inversify';
import fetch, { Response } from 'node-fetch';
import { ErrorType } from '../errors/error-type';
import { TimelineError } from '../errors/timeline-error';

@injectable()
class RequestClient {
  private static async transformResponse(response: Response, json?: boolean): Promise<unknown> {
    if (response.status >= 200 && response.status < 300) {
      if (json) {
        return response.json();
      }
      return response.text();
    }
    const errorMessage = await response.text();
    throw new TimelineError({
      type: ErrorType.NetworkError,
      message: errorMessage,
      code: response.status,
    });
  }
  async get(url: string, json?: boolean): Promise<unknown> {
    const response = await fetch(url);
    return RequestClient.transformResponse(response, json);
  }
}

export { RequestClient };

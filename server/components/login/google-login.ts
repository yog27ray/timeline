import { inject, injectable } from 'inversify';
import { RequestClient } from '../request-client/request-client';

@injectable()
export class GoogleLogin {
  @inject(RequestClient) private requestClient: RequestClient;

  async findSocialProfile(token: string): Promise<{ name: string; email: string; photo: string; }> {
    const { email, name, picture } = await this.requestClient.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
      true) as Record<string, string>;
    return { name, email, photo: picture.split('=')[0] };
  }
}

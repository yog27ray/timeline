import { inject, injectable } from 'inversify';
import { SocialLogin } from '../components/login';
import { SecurityHelper } from './security.helper';

@injectable()
export class CloudFunction {
  @inject(SecurityHelper) private securityHelper: SecurityHelper;
  @inject(SocialLogin) private socialLogin: SocialLogin;

  initialize(): void {
    this.login();
  }

  private login(): void {
    this.securityHelper.unauthenticatedCloudFunction('login', async (req) => {
      const { method, authData } = req.params;
      const sessionToken = await this.socialLogin.login(method as string, authData as Record<string, string>);
      return { sessionToken };
    });
  }
}

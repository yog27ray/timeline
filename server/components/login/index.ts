import { inject, injectable } from 'inversify';
import { env } from '../../config/env';
import { DBQuery } from '../d-b-query/d-b-query';
import { ErrorType } from '../errors/error-type';
import { TimelineError } from '../errors/timeline-error';
import { GoogleLogin } from './google-login';

@injectable()
export class SocialLogin {
  @inject(DBQuery) private dbQuery: DBQuery;
  @inject(GoogleLogin) private googleLogin: GoogleLogin;

  private static verifyEmailAccess(email: string): void {
    const validEmailIdDomains = env.WHITELISTED_EMAIL_DOMAIN.split(',').filter((each: string) => each);
    if (!validEmailIdDomains.length) {
      return;
    }
    if (validEmailIdDomains.includes(email.split('@')[1])) {
      return;
    }
    throw new TimelineError({
      code: 412,
      message: 'Email Id not allowed to access.',
      type: ErrorType.InvalidEmailId,
    });
  }

  async login(method: string, authData: Record<string, string>): Promise<string> {
    switch (method) {
      case 'google': {
        const { name, email, photo } = await this.findSocialProfile(method, authData);
        SocialLogin.verifyEmailAccess(email);
        const user = (await this.dbQuery.findOne(Table.User, {
          where: { email },
          option: { useMasterKey: true },
        })) || new Table.User();
        await user.linkWith(method as string, { authData }, { useMasterKey: true });
        await user.save({ name, photo }, { useMasterKey: true });
        return user.getSessionToken();
      }
      default: {
        throw new TimelineError({
          code: 404,
          type: ErrorType.InvalidLoginMethod,
          message: 'Unsupported Login Method.',
        });
      }
    }
  }

  private findSocialProfile(
    method: string,
    { id_token: token }: Record<string, string>): Promise<{ name: string; email: string; photo: string; }> {
    return this.googleLogin.findSocialProfile(token);
  }
}

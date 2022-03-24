import { injectable } from 'inversify';
import { ErrorType } from '../../components/errors/error-type';
import { TimelineError } from '../../components/errors/timeline-error';

@injectable()
export class PostHelper {
  addUser(post: Table.Post, user: Table.User): void {
    if (!post.has('user') && user) {
      post.set('user', user);
    }
  }

  validation(post: Table.Post): void {
    if (['user', 'title', 'description'].some((each: ParseKeys<Table.Post>) => !post.has(each))) {
      throw new TimelineError({
        code: 412,
        type: ErrorType.InvalidRequest,
        message: 'Required data is missing',
      });
    }
  }

  updateEventTime(post: Table.Post): void {
    if (!post.has('eventTime')) {
      post.set('eventTime', new Date());
    }
  }
}

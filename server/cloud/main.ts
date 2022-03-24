import { container } from '../components/inversify';
import { CloudFunction } from './cloud-function';
import { PostHooks } from './post/post.hooks';
import { UserHooks } from './user/user.hooks';

container.get(CloudFunction).initialize();
container.get(PostHooks).initialize();
container.get(UserHooks).initialize();

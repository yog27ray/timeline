import { Container } from 'inversify';
import { ACLRoles } from '../../cloud/acl/acl.roles';

const container = new Container({ autoBindInjectable: true });

container.bind(ACLRoles).toSelf().inSingletonScope();

export { container };

import { extendType, intArg, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name', { description: 'Full name of the user' });
    t.boolean('isActive');
    t.string('lastLogin');
  },
});

export default extendType({
  type: 'Query',
  definition: t => {
    t.field('currentUser', {
      type: 'User',
      nullable: true,
      resolve(_root, _args, { currentUser }) {
        return currentUser;
      },
    });
    t.field('userById', {
      type: 'User',
      nullable: true,
      args: { id: intArg({ required: true }) },
      resolve(_root, { id }, { photon }) {
        return photon.users.findOne({ where: { id } });
      },
    });
    t.list.field('users', {
      type: 'User',
      nullable: true,
      resolve(_root, _args, { photon }) {
        return photon.users();
      },
    });
  },
});

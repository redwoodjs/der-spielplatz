import { extendType, stringArg, objectType } from 'nexus';

export const Document = objectType({
  name: 'Document',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('path');
    t.field('user', { type: 'User' });
  },
});

export default extendType({
  type: 'Query',
  definition: t => {
    t.list.field('documents', {
      type: 'Document',
      // TODO: Figure out why `startsWith` isn't working
      args: { pathStartsWith: stringArg({ required: true, default: '://' }) },
      resolve(_root, { pathStartsWith }, { photon }) {
        // FIXME: photon.documents({ where: { path : { startsWith: pathStartsWith }}})
        return photon.documents();
      },
    });
  },
});

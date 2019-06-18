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
      args: { pathStartsWith: stringArg({ required: true, default: '://' }) },
      resolve(_root, { pathStartsWith }, { photon }) {
        // FIXME: Use `startsWith` instead of contains when that's fixed in Photon
        // FIXME: `select` and `includes` are not working
        return photon.documents.findMany({
          where: { path: { contains: pathStartsWith } },
        });
      },
    });
  },
});

import { extendType } from 'nexus';

export default extendType({
  type: 'Query',
  definition: t => {
    t.string('version', () => 'v0.19.2');
  },
});

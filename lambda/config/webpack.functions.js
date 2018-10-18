module.exports = {
  // https://github.com/bitinn/node-fetch/issues/493#issuecomment-414111024
  resolve: {
    alias: {
      'node-fetch$': 'node-fetch/lib/index.js',
    },
  },
  // https://github.com/websockets/ws/issues/1220
  // module: {
  //   noParse: /ws/,
  // },
  externals: /bufferutil|utf-8-validate/,
};

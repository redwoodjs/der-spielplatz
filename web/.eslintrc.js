module.exports = {
  extends: '@peterp/eslint-config',
  plugins: ['react-hooks'],
  rules: {
    indent: ['error', 2],
    'react-hooks/rules-of-hooks': 'error',
  },
  env: {
    browser: true,
  },
};

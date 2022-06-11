module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['*.spec.js'],
  rules: {
    'no-unused-vars': 'off',
    'n/no-path-concat': 'off',
  },
};

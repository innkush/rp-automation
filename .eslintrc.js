module.exports = {
  root: true,
  files: ["cypress/e2e/spec/*.js"],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    cypress: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'error',
    "no-unused-vars": "error",
  },
};

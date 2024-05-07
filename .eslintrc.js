module.exports = {
  root: true,
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  globals: {
    cy: true,
    Cypress: true, 
    expect: true, 
  },
  ignorePatterns: ['node_modules/', 'mochawesome-report/', 'logs/'],
  
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['import', '@stylistic/js'],
  rules: {
    'import/no-unresolved': 'error',
    'no-unused-vars': 'error',
    'eol-last': 2,
    'no-multiple-empty-lines': ['error', { 'max': 8, 'maxEOF': 0 }],
    'quotes': ['error', 'single'],
    '@stylistic/js/indent': ['error', 2],
  },
};

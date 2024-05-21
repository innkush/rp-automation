module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\\.js$': 'babel-jest' },
  testMatch: ['**/api/api_tests/**/*.js'],
  testPathIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    'chai': '<rootDir>/__mocks__/chai.js',
  },
  testTimeout: 60000,
};

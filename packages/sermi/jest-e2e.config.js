module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@lib/db/(.*)': '<rootDir>/libs/db/src/$1',
    '@lib/db': '<rootDir>/libs/db/src',
    '@app/server/(.*)': '<rootDir>/apps/yumi-server/src/$1',
    '@app/server': '<rootDir>/apps/yumi-server/src',
    configs: '<rootDir>/configs.ts',
  },
}

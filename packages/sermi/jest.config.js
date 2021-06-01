module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '@lib/db/(.*)': '<rootDir>/libs/db/src/$1',
    '@lib/db': '<rootDir>/libs/db/src',
    '@app/server/(.*)': '<rootDir>/apps/yumi-server/src/$1',
    '@app/server': '<rootDir>/apps/yumi-server/src',
    configs: '<rootDir>/configs.ts',
  },
}

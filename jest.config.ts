export default {
  preset: 'ts-jest',
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@validators/(.*)$': '<rootDir>/src/shared/domain/validators/$1',
  },
  moduleFileExtensions: ['ts', 'js'],
}

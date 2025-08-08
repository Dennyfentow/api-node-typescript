import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default config;
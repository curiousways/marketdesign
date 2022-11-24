module.exports = {
  clearMocks: true,
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['./jest.setup.after-env.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
  },
};

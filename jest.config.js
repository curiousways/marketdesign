module.exports = {
  clearMocks: true,
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['./jest.setup.after-env.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};

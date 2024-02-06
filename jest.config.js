module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.ts|tsx?$': 'ts-jest',
    '^.+\\.js|jsx?$': '<rootDir>/node_modules/babel-jest',
  },

  moduleNameMapper: {
    '\\.(jpg|JPG|gif|GIF|png|PNG|less|LESS|css|CSS)$':
      '<rootDir>/src/test/unit/mocks/file.mock.js',
  },

  setupFilesAfterEnv: ['./src/setupTests.js'],

  moduleDirectories: ['node_modules', 'src'],

  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx,js,jsx}'], // All test files in subdirectories under /src
}

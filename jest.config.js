module.exports = {
  testEnvironment: "node",
  testTimeout: 100000,
  coveragePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["./src/test/setup.js"],
};

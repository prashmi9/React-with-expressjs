module.exports = {
  // Enable the use of ES modules
  require: "esm",

  // Specify the test files directory
  spec: "src/**/*.test.js",

  // Reporter options
  reporter: "spec",
  color: true,

  // Global variables you may need in your tests
  globals: ["chai"],

  // Set timeout for each test case (in milliseconds)
  timeout: 5000,

  // Additional configuration options as needed
  // For example:
  // bail: true, // Stop running tests after the first failure
  // recursive: true, // Enable recursive directory scanning for test files
};

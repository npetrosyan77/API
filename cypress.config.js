const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    failOnStatusCode: false,
    projectId: "cwenng",
    env: { "cypress_record_key": "659bdec0-7cec-459d-bb41-a3f2176d2664" }
  },
});

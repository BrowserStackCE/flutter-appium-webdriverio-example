var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/test/login.spec.js"],
  host: "hub.browserstack.com",
  capabilities: [
    {
      maxInstances: 1,
      "browserstack.debug": true,
      automationName: "Flutter",
      os_version: "8.0",
      device: "Samsung Galaxy S9",
      app: "bs://cf2d89bc7bcf64723ffaa96b509fee635904976d",
      name:
        require("minimist")(process.argv.slice(2))["bstack-session-name"] ||
        "default_name",
      build:
        process.env.BROWSERSTACK_BUILD_NAME ||
        "flutter-appium-webdriverio" + " - " + new Date().getTime(),
    },
  ],
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (require("minimist")(process.argv.slice(2))["bstack-session-name"]) {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          require("minimist")(process.argv.slice(2))["bstack-session-name"] +
          '" }}'
      );
    } else {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          test.title +
          '" }}'
      );
    }

    if (passed) {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      await browser.takeScreenshot();
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}'
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);

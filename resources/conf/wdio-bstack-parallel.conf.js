var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/test/*.js"],
  host: "hub.browserstack.com",
  commonCapabilities: {
    maxInstances: 2,
    "browserstack.debug": true,
    automationName: "Flutter",
    app: "bs://cf2d89bc7bcf64723ffaa96b509fee635904976d",
    name:
      require("minimist")(process.argv.slice(2))["bstack-session-name"] ||
      "default_name",
    build:
      process.env.BROWSERSTACK_BUILD_NAME ||
      "flutter-appium-webdriverio" + " - " + new Date().getTime(),
  },
  capabilities: [
    {
      os_version: "8.0",
      device: "Samsung Galaxy S9",
    },
    { os_version: "9.0", device: "Google Pixel 3" },
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

exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

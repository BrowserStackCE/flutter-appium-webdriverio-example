var defaults = require("./wdio.conf.js");
var _ = require("lodash");


var overrides = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  specs: ["./src/test/flutterAndroid.spec.js"],
  host: "hub.browserstack.com",
  capabilities: [
    {
      maxInstances: 1,
      "browserstack.debug": true,
      automationName: "Flutter",
      os_version: "11.0",
      realMobile: 'true',
      device: "Samsung Galaxy S21",
      app: "bs://<app_id_camera_injection>", //pass the app_url or custom id of the uploaded app on BrowserStack. Note: For camera_injection, sample apk for app upload is placed under /resources/app directory
      "browserstack.uploadMedia":['media://<media_url>'], //pass the media_url or custom id of the .png file. Note: For camera_injection, sample media file is placed under /resources/image directory 
      "browserstack.enableCameraImageInjection" : true,
      autoGrantPermissions: true,
     noReset: false,
      name:
        "flutter_Android_Demo",
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
    if (passed) {
      await browser.execute(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      await browser.takeScreenshot();
      await browser.execute(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}'
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);

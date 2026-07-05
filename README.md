![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# BrowserStack Examples WebdriverIO Flutter <a href="https://webdriver.io/"><img src="https://avatars.githubusercontent.com/u/72550141?s=48&v=4" alt="WebdriverIO" height="22" /></a> <a href="https://nodejs.org/en/"><img src="https://brandslogos.com/wp-content/uploads/images/large/nodejs-icon-logo.png" alt="nodejs" height="22" /></a> <a href="https://mochajs.org/"><img src="https://brandslogos.com/wp-content/uploads/images/large/mocha-logo.png" alt="mocha" height="22" /></a> <a href="https://flutter.dev/"><img src="https://flutter.dev/assets/flutter-lockup-1caf6476beed76adec3c477586da54de6b552b2f42108ec5bc68dc63bae2df75.png" alt="flutter" height="22" /></a>

## Introduction

WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and flakiness test suite.

This BrowserStack Example repository demonstrates a WebdriverIO tests framework written in Mocha and nodeJS with parallel testing capabilities. The WebdriverIO test scripts are written for the open source The Flutter App ([Github](https://github.com/abhi2810/the_app_flutter)).

The WebDriverIO tests are run on different platforms like on-prem, docker and BrowserStack using various run configurations and test capabilities.

---

## Repository setup

- Clone the repository

- Ensure you have the following dependencies installed on the machine

  - NodeJS >= 14.16.0 (includes npm 6.14.11)

- Run below command to configure dependencies

  ```sh
  npm install
  ```

## Test infrastructure environments

- [BrowserStack](#browserstack)

## Configuring the maximum parallel test threads for this repository

For all the parallel run configuration profiles, you can configure the maximum parallel test threads by changing the settings below.

- BrowserStack

  `./resources/conf/wdio-bstack-parallel.conf.js`

  ```js
  commonCapabilities: [{
  maxInstances: 5,
  ...
  ```

## Test Reporting

- [Allure reports](#generating-allure-reports)

---

# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## Prerequisites

- Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
- Identify your BrowserStack username and access key from the [BrowserStack Automate Dashboard](https://automate.browserstack.com/) and export them as environment variables using the below commands.

  - For \*nix based and Mac machines:

  ```sh
  export BROWSERSTACK_USERNAME=<browserstack-username> &&
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

  - For Windows:

  ```shell
  set BROWSERSTACK_USERNAME=<browserstack-username>
  set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

  Alternatively, you can also hardcode username and access_key objects in conf files releated to BrowserStack at `./resources/conf/` file.

Note:

- We have configured a list of test capabilities in the files at `./resources/conf/`. You can certainly update them based on your device / browser test requirements.
- The exact test capability values can be easily identified using the [Browserstack Capability Generator](https://browserstack.com/automate/capabilities)

## Running Your Tests

### Run a specific test on BrowserStack

In this section, we will run a single test on Chrome browser on Browserstack. To change test capabilities for this configuration, please refer to the `capabilities` object in `./resources/conf/wdio-bstack-single.conf.js` file.

- How to run the test?

  - To run the default test scenario (e.g. End to End Scenario) on BrowserStack, use the following command:

  ```sh
  npm run single
  ```

- How to custom build and session names?

  - When you run test on BrowserStack it creates a build and session under which you can see your results. In this framework, if you want to add some custome name for build and session you can do like below:

  - Set build name by setting env varaibale:

    - For \*nix based and Mac machines:

    ```sh
    export BROWSERSTACK_BUILD_NAME=<browserstack_build_name>
    ```

    - For Windows:

    ```shell
    set BROWSERSTACK_BUILD_NAME=<browserstack_build_name>
    ```

  - Set session name by command line aregument: You can do this while running test like below.

    ```sh
    npm run single -- --bstack-session-name <session_name>
    ```

  If you dont want to add, this framework will add build and session name with a time stamp for better tracking.

- Output

  This run profile executes a single test on a single browser on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

### Run the entire test suite in parallel on a BrowserStack device

In this section, we will run the tests in parallel on a single browser on Browserstack. Refer to `capabilities` object in `./resources/conf/wdio-bstack-parallel.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  To run the entire test suite in parallel on a single BrowserStack browser, use the following command:

  ```sh
  npm run parallel
  ```

- Output

  This run profile executes the entire test suite in parallel on a single BrowserStack browser. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

  - Note: By default, this execution would run maximum 5 test threads in parallel on BrowserStack. Refer to the section ["Configuring the maximum parallel test threads for this repository"](#Configuring-the-maximum-parallel-test-threads-for-this-repository) for updating the parallel thread count based on your requirements.

### Run the Camera Injection test on a BrowserStack device

In this section, we will run the camera injection test ion an android device on Browserstack. Refer to `capabilities` object in `./resources/conf/wdio-bstack-flutterAndroid.conf.js` file to change test capabilities for this configuration.

  ## Prerequisites

  - Upload Camera Injection APK (placed in `./resources/app/app-debug.apk`) using the [Upload Apps Functionality](https://www.browserstack.com/docs/app-automate/appium/upload-app-from-filesystem) .
  - Upload desired image (placed in `./resources/images/instagram-logo.png`) using cURL command as described in the link:  [Test Camera image capture and QR/Barcode scanning](https://www.browserstack.com/docs/app-automate/appium/advanced-features/camera-image-injection) .

- How to run the test?

  To run the test on an android device, use the following command:

  ```sh
  npm run Android  
  ```

- Output

  This run profile executes the camera injection test on an android device. Please refer to your [BrowserStack App Automate dashboard](https://app-automate.browserstack.com/) for test results.

## Generating Allure Reports

- Generate Report using the following command: `npm run generate-report`

## Additional Resources

- View your test results on the [BrowserStack App Automate dashboard](https://www.browserstack.com/app-automate)
- Documentation for writing [Automate test scripts in Java](https://www.browserstack.com/automate/java)
- Customizing your tests capabilities on BrowserStack using our [test capability generator](https://www.browserstack.com/app-automate/capabilities)
- [List of Browsers & mobile devices](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate) for automation testing on BrowserStack
- [Using Automate REST API](https://www.browserstack.com/automate/rest-api) to access information about your tests via the command-line interface
- Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)
- For testing public web applications behind IP restriction, [Inbound IP Whitelisting](https://www.browserstack.com/local-testing/inbound-ip-whitelisting) can be enabled with the [BrowserStack Enterprise](https://www.browserstack.com/enterprise) offering
- For testing flutter app refer the pre-requisites in the following link, [Test Flutter apps](https://www.browserstack.com/docs/app-automate/appium/test-hybrid-apps/test-flutter-apps?utm_source=beamer&utm_medium=standalone&utm_campaign=Test-Flutter-apps-with-our-Appium-Flutter-Driver-Integration&utm_content=ctalink#nodejs)
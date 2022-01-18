const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');
const osSpecificOps = {
  // platformName: 'Android',
  // deviceName: 'emulator-5554',
  // appPackage: "com.intelloLabs.intelloTrack",
  // appActivity: "com.intello.intello_track_so.MainActivity",
  // app: '/Users/ayushgoyal/Development/intello-track-so/build/app/outputs/flutter-apk/app-debug.apk',

device: 'Samsung Galaxy S21 Ultra',
  os_version: '11.0',
  // os_version : "15",
  // device : "iPhone 11 Pro", 
   browserName: 'android',
  realMobile: 'true',
  // app: 'bs://6f7b57a1e5f66dffacd226023d6b75e762666dfd',
  // app: 'bs://bc14a1a3b0c2f59ac5aeffa2ef8dc86dfa6ce87d',
  // iosApp
  app: 'bs://ffbfa0bbbd1bb103428a2ac6b3c6a585852b4364' ,
  "browserstack.enableCameraImageInjection" : true,
  //appium
  // 'browserstack.resignApp': true,
  
  retryBackoffTime: 7500,
  maxRetryCount: 3,
  noReset: false,
// */
}

const opts = {
  protocol: 'https',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
//  user: 'ayushgoyal_RfwP9C',
//  key: 'LqYsp8Ls2M1HNWhbh5KY',
user: process.env.BROWSERSTACK_USERNAME,
key: process.env.BROWSERSTACK_ACCESS_KEY,
  
  // path: '/wd/hub',
  // port: 4723,
  capabilities: {
    ...osSpecificOps,
    'browserstack.uploadMedia':['media://c62c7b3ca0122051a39932dfac7eae1f261cd37e'],
    // 'browserstack.networkLogs':true,
    automationName: 'Flutter',
     autoGrantPermissions: true,
     noReset: false
  }
};


const login = require('./uiTesting/login/login.js');
const home = require('./uiTesting/home/home.js');
const create = require('./uiTesting/create/create.js');
const inspection = require('./uiTesting/inspection/inspection.js');
const profile = require('./uiTesting/profile/profile.js');

(async () => {
  
  //Initial app testing
  console.log('Initial app testing');
  const driver = await wdio.remote(opts);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));  
  await driver.execute('flutter:clearTimeline');
  await driver.execute('flutter:forceGC');
  assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
  await delay(2000);

  //Calling UI Tests
  await login.loginTest(driver,find,assert,delay);
  await home.homeTest(driver,find,assert,delay);
  await inspection.inspectionTest(driver,find,assert,delay);
  await create.createTest(driver,find,assert,delay);
  await delay(5000);
  await profile.profileTest(driver,find,assert,delay);
  
  //Clearing Session
  driver.deleteSession();

})();
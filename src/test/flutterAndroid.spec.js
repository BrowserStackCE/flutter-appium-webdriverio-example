const { expect } = require("chai");
const find = require("appium-flutter-finder");

describe("The flutter App", () => {
  it(`login`, async () => {
    await browser.execute('flutter:clearTimeline');
    await browser.execute('flutter:forceGC');
    expect(await browser.execute('flutter:checkHealth')).to.be.equals('ok');

    await browser.execute('browserstack_executor: {"action": "cameraImageInjection", "arguments": {"imageUrl":"media://7f5d664c45bc4b971f6c2d29de05a4d1aa28ab38"}}');
    await browser.pause(6000);
   
    await browser.elementClick(find.descendant({
      of: find.byType('GestureDetector'),
      matching: find.byType('Container'),
      firstMatchOnly : true,
    }));
    await browser.pause(10000);
    
    await browser.switchContext('NATIVE_APP');
    await browser.$('//android.widget.Button[@content-desc="CameraBtn"]').click();
    await browser.pause(4000);
  
  });
});

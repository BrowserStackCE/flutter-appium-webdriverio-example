const { expect } = require("chai");
const find = require("appium-flutter-finder");

describe("The flutter App", () => {
  it(`echo box pass`, async () => {
    await driver.elementClick(find.byValueKey("0"));
    await driver.pause(1000);
    await driver.elementSendKeys(find.byType("TextFormField"), "hello");
    await driver.pause(3000);
    await driver.elementClick(find.byType("ElevatedButton"));
    await driver.pause(1000);
    const value = await driver.getElementText(find.byValueKey("value"));
    expect(value).to.be.equals("hello");
  });
});

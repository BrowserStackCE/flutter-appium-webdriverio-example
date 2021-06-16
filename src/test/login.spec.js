const { expect } = require("chai");
const find = require("appium-flutter-finder");

describe("The flutter App", () => {
  it(`login`, async () => {
    await browser.elementClick(find.byValueKey("1"));
    await browser.pause(1000);
    await browser.elementSendKeys(find.byValueKey("username"), "alice");
    await browser.pause(3000);
    await browser.elementSendKeys(find.byValueKey("password"), "mypassword");
    await browser.pause(3000);
    await browser.elementClick(find.byType("ElevatedButton"));
    await browser.pause(1000);
    const loggedInAs = await browser.getElementText(
      find.byValueKey("loggedInAs")
    );
    expect(loggedInAs).to.be.equals("Logged in as alice.");
  });
});

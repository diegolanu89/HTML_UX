require("mocha");
const webdriver = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;

describe('JS-Selenium-Exercise', function () {
    describe('Test1', function () {
        it('should follow the instructions', async function () {
            this.timeout(20000);
            const driver = new webdriver.Builder()
                .forBrowser('firefox')
                .build();

            // Open google.com
            await driver.get("http://www.google.com");

            // Example assertion:
            let title = await driver.getTitle();
            assert.equal(title, "Google");

            //start writing tests here:

            

            await driver.quit();
        })
    })
});
const {Before, After} = require('@cucumber/cucumber')
const { chromium, firefox, webkit, devices } = require('playwright');

// Increases the default timeout to 1 min, default is 30 sec
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);


Before(async function () {
     browser = await chromium.launch({headless: false})
    //browser = await chromium.launch({headless: false, channel: 'msedge'}) //-- Launches installed Edge browser
    const context = await browser.newContext();
    page = await context.newPage();
})


After(async function () {

    // For taking a screenshot after scenario execution 
    const buffer = await page.screenshot()
    var world = this
    world.attach(buffer, "image/png")

    await new Promise(r => setTimeout(() => r(), 10000))

    await browser.close()
})
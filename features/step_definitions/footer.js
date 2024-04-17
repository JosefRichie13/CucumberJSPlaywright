const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const DriverMethods = require('../support/driver.js');

When('I confirm that the footer is {string}', async function(visibleStatus){
    if (visibleStatus == "not visible") {
        assert.equal(await DriverMethods.ElementVisibleOrNot(selectors.Footer), false)
    }
    else {
        assert.equal(await DriverMethods.ElementVisibleOrNot(selectors.Footer), true)
    }
})

Then('the {string} icon in the footer should open {string}', async function(footerIcon, redirectURL){
    switch(footerIcon){
        case "Twitter":
            newURL = await DriverMethods.GetURLFromANewTab(selectors.Footer_Twitter);
            assert.equal(newURL, redirectURL);
            break
        case "Facebook":
            newURL = await DriverMethods.GetURLFromANewTab(selectors.Footer_FB);
            assert.equal(newURL, redirectURL);
            break
        case "LinkedIn":
            newURL = await DriverMethods.GetURLFromANewTab(selectors.Footer_Linkedin);
            assert.equal(newURL, redirectURL);
            break
        default :
            throw new IllegalStateException     
    }
})
const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const configs = require('../support/configs.json')
const selectors = require('../support/selectors.json')

 
Given('I open the web page', async function(){
    await page.goto(configs.MainURL)
})

When('I login as a {string} user', async function(UserType){
    switch(UserType){
        case "standard":
            await page.locator(selectors.UserName).type(configs.ValidUser)
            await page.locator(selectors.Password).type(configs.Password)
            break
        case "locked":
            await page.locator(selectors.UserName).type(configs.LockedUser)
            await page.locator(selectors.Password).type(configs.Password)
            break
    }
    await page.locator(selectors.LoginButton).click()
})

Then('I should see {string} in the {string}', async function(Message, Page){
    switch(Page){
        case "homepage":
            assert.equal(await page.locator(selectors.HomePageTitle).textContent(), Message)
            break;
    }
})

Then('I should see the login error message {string}', async function(Message){
    expect(await page.locator(selectors.ErrorMessage).textContent()).to.contain(Message)
})
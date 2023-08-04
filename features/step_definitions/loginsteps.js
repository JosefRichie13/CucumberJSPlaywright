const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')

 
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
        case "no_username":
            await page.locator(selectors.Password).type(configs.Password)
            break
        case "no_password":
            await page.locator(selectors.UserName).type(configs.ValidUser)    
            break
        case "wrong_username":        
            await page.locator(selectors.UserName).type(configs.WrongUser)
            await page.locator(selectors.Password).type(configs.Password)
            break
        case "wrong_password":
            await page.locator(selectors.UserName).type(configs.ValidUser)
            await page.locator(selectors.Password).type(configs.WrongPassword)
            break
        default :
            console.log("Incorrect Usertype")       
    }
    await page.locator(selectors.LoginButton).click()
})

Then('I should see {string} in the {string}', async function(Message, Page){
    switch(Page){
        case "homepage":
            assert.equal(await page.locator(selectors.HomePageTitle).textContent(), Message)
            assert.equal(await page.locator(selectors.LoginButton).isVisible(), false)
            break;
        case "loginpage":
            assert.equal(await page.locator(selectors.LoginPageTitle).textContent(), Message) 
            assert.equal(await page.locator(selectors.LoginButton).isVisible(), true)   
            break
        default : 
            console.log("Incorrect page")    
    }
})

Then('I should see the login error message {string}', async function(Message){
    expect(await page.locator(selectors.ErrorMessage).textContent()).to.contain(Message)
})

Then('I logout of the webpage', async function(){
    await page.locator(selectors.Menu).click()
    await page.locator(selectors.LogoutButton).click()
})
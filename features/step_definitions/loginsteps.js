const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const DriverMethods = require('../support/driver.js')

 
Given('I open the web page', async function(){
    await DriverMethods.LoadAUrl(configs.MainURL)
})

When('I login as a {string} user', async function(UserType){
    switch(UserType){
        case "standard":
            await DriverMethods.TypeText(selectors.UserName, configs.ValidUser)
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "locked":
            await DriverMethods.TypeText(selectors.UserName, configs.LockedUser)
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "no_username":
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "no_password":
            await DriverMethods.TypeText(selectors.UserName, configs.ValidUser)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "wrong_username":
            await DriverMethods.TypeText(selectors.UserName, configs.WrongUser)
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "wrong_password":
            await DriverMethods.TypeText(selectors.UserName, configs.ValidUser)
            await DriverMethods.TypeText(selectors.Password, configs.WrongPassword)
            await DriverMethods.ClickButton(selectors.LoginButton)
            break
        case "visual_success":
            await DriverMethods.TypeText(selectors.UserName, configs.ValidUser)
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            await DriverMethods.TakeScreenshotWithFullPage('./features/screenshots/visual_success_before.png')
            break
        case "visual_error":
            await DriverMethods.TypeText(selectors.UserName, configs.VisualUser)
            await DriverMethods.TypeText(selectors.Password, configs.Password)
            await DriverMethods.ClickButton(selectors.LoginButton)
            await DriverMethods.TakeScreenshotWithFullPage('./features/screenshots/visual_error_before.png')
            break            
        default :
            console.log("Incorrect Usertype")       
    }
})

Then('I should see {string} in the {string}', async function(Message, Page){
    switch(Page){
        case "homepage":
            assert.equal(await DriverMethods.GetTextFromElement(selectors.HomePageTitle), Message)
            assert.equal(await DriverMethods.ElementVisibleOrNot(selectors.LoginButton), false)
            break;
        case "loginpage":
            assert.equal(await DriverMethods.GetTextFromElement(selectors.LoginPageTitle), Message)
            assert.equal(await DriverMethods.ElementVisibleOrNot(selectors.LoginButton), true)
            break
        default : 
            console.log("Incorrect page")    
    }
})

Then('I should see the login error message {string}', async function(Message){
    expect(await DriverMethods.GetTextFromElement(selectors.ErrorMessage)).to.contain(Message)
})

Then('I logout of the webpage', async function(){
    await DriverMethods.ClickButton(selectors.Menu)
    await DriverMethods.ClickButton(selectors.LogoutButton)
})
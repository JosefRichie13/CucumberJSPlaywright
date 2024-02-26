const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const HelperMethods = require('../support/methods.js')
const DriverMethods = require('../support/driver.js')

When('I add {string} to the cart', async function(Product){
    Names = await DriverMethods.GetListOfElementText(selectors.ProductList)
    NamesFromUI = await HelperMethods.NamesFromList(await Names.allTextContents())

    Index = NamesFromUI.indexOf(Product)
    await DriverMethods.ClickNthButton(selectors.AddToCart, Index)
})

When('I click on the cart', async function(){
    await DriverMethods.ClickButton(selectors.Cart)
})

When('I checkout', async function(){
    await DriverMethods.ClickButton(selectors.Checkout)
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await DriverMethods.TypeText(selectors.FirstName, UserDetails[0]['FirstName'])
    await DriverMethods.TypeText(selectors.LastName, UserDetails[0]['FirstName'])
    await DriverMethods.TypeText(selectors.ZipCode, UserDetails[0]['FirstName'])

    await DriverMethods.ClickButton(selectors.ContinueButton)

})

When('I confirm my order', async function(){
    await DriverMethods.ClickButton(selectors.FinishButton)
})

Then('I should see {string} after the order is placed', async function(Message){
    assert.equal(await DriverMethods.GetTextFromElement(selectors.CheckoutBanner), Message)
})
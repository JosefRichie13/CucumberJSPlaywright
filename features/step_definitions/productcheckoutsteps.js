const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const HelperMethods = require('../support/methods.js')

When('I add {string} to the cart', async function(Product){
    Names = await page.locator(selectors.ProductList)
    NamesFromUI = HelperMethods.NamesFromList(await Names.allTextContents())

    Index = NamesFromUI.indexOf(Product)
    await page.locator(selectors.AddToCart).nth(Index).click()
})

When('I click on the cart', async function(){
    await page.locator(selectors.Cart).click()
})

When('I checkout', async function(){
    await page.locator(selectors.Checkout).click()
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await page.locator(selectors.FirstName).type(UserDetails[0]['FirstName'])
    await page.locator(selectors.LastName).type(UserDetails[0]['LastName'])
    await page.locator(selectors.ZipCode).type(UserDetails[0]['Zip'])

    await page.locator(selectors.ContinueButton).click()

})

When('I confirm my order', async function(){
    await page.locator(selectors.FinishButton).click()
})

Then('I should see {string} after the order is placed', async function(Message){
    assert.equal(await page.locator(selectors.CheckoutBanner).textContent(), Message)
})
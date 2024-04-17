const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const HelperMethods = require('../support/methods.js')
const DriverMethods = require('../support/driver.js')

When('I add {string} to the cart', async function(Product){
    addOrRemoveFromCart(Product)
    await new Promise(resolve => setTimeout(resolve, 1000));
})

When('I remove {string} from the cart', async function(Product){
    addOrRemoveFromCart(Product)
    await new Promise(resolve => setTimeout(resolve, 1000));
})

function addOrRemoveFromCart(Product){
    switch(Product){
        case "Sauce Labs Backpack":
            DriverMethods.ClickButton(selectors.ProductBackpack)
            break
        case "Sauce Labs Bike Light":
            DriverMethods.ClickButton(selectors.ProductBikelight)
            break
        case "Sauce Labs Bolt T-Shirt":
            DriverMethods.ClickButton(selectors.ProductTshirt)
            break
        case "Sauce Labs Fleece Jacket":
            DriverMethods.ClickButton(selectors.ProductJacket)
            break
        case "Sauce Labs Onesie":       
            DriverMethods.ClickButton(selectors.ProductOnesie)
            break
        case "Test.allTheThings() T-Shirt (Red)":
            DriverMethods.ClickButton(selectors.ProductTshirtRed)
            break
        default :
            throw new IllegalStateException     
    }
    
}

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

/*
We get the Tax shown in the UI, extract the number, convert it into float and store it in a variable, taxCalculatedByAPP
We get the non taxed sum shown in the UI, extract the number, convert into float, multiple it by 0.08 (8%), round the result off to 2 and store it in a variable, taxCalculatedByCODE
Then we check if both taxCalculatedByAPP and taxCalculatedByCODE are equal

We get the total shown in the UI, extract the number, convert it into float and store it in a variable, totalCalculatedByAPP
We get the non tax added total shown in the UI, extract the number, convert into float, add the tax calculated (taxCalculatedByCODE) and store it in a variable, totalCalculatedByCODE
Then we check if both totalCalculatedByAPP and totalCalculatedByCODE are equal
*/
Then('I should see the tax calculated at 8 percent', async function() {

    taxCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement(selectors.TaxCalculated)).replace(/[^0-9\-+\.]/g, "")).toFixed(2)
    taxCalculatedByCODE = ((parseFloat((await DriverMethods.GetTextFromElement(selectors.Subtotal)).replace(/[^0-9\-+\.]/g, "")).toFixed(2))*0.08).toFixed(2)
    assert.equal(taxCalculatedByAPP, taxCalculatedByCODE)

    totalCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement(selectors.FullTotal)).replace(/[^0-9\-+\.]/g, ""))
    totalCalculatedByCODE = parseFloat((await DriverMethods.GetTextFromElement(selectors.Subtotal)).replace(/[^0-9\-+\.]/g, "")) + parseFloat(taxCalculatedByCODE)
    assert.equal(totalCalculatedByAPP, totalCalculatedByCODE)

})

/*
We get the individual prices into an array, individualPrices
We remove the $ sign, convert the array elements into float and sum it. Storing it in a variable, sumCalculatedByCODE
We get the total displayed in the UI, extract the number, convert into float and store it in a variable, sumCalculatedByAPP
Then we check if sumCalculatedByCODE and sumCalculatedByAPP are equal
*/
Then('I should see the individual items total correctly', async function() {
    individualPrices = await DriverMethods.GetListOfElementText(selectors.PriceList)
    individualPricesInFloatWithoutSign = individualPrices.map(price => parseFloat(price.substring(1)));
    sumCalculatedByCODE = individualPricesInFloatWithoutSign.reduce((partialSum, a) => partialSum + a, 0);

    sumCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement(selectors.Subtotal)).replace(/[^0-9\-+\.]/g, ""))

    assert.equal(sumCalculatedByCODE, sumCalculatedByAPP)
})
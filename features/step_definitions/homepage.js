const {When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const DriverMethods = require('../support/driver.js');

When('I should see {string} items in the cart bubble', async function(cartNumber){
    await new Promise(r => setTimeout(() => r(), 3000))
    assert.equal(await DriverMethods.GetTextFromElement(selectors.ItemNumberInCart), cartNumber)
})

Then('the sort {string} should work correctly', async function(sortType){
    switch(sortType){
        /*
        We get the list of prices from the mainpage and store them in an array, noSortPrices
        We remove the $ sign and convert the prices to floats and store them in an array, noSortPricesInFloatWithoutSign
        We then sort it Descending and store it in an array, sortedPricesHighToLow
        We then select the Price (high to low) option from the dropdown, repeat the step 1 and 2
        We end up with prices sorted by the application in an array, afterSortPricesInFloatWithoutSign
        Finally we compare both arrays if they are the same
        */
        case "Price (high to low)":
            noSortPrices = await DriverMethods.GetListOfElementText(selectors.PriceList)
            noSortPricesInFloatWithoutSign = await noSortPrices.map(price => parseFloat(price.substring(1)));
            sortedPricesHighToLow = await noSortPricesInFloatWithoutSign.sort(function(a, b){return b-a});

            await DriverMethods.SelectFromDropdownUsingText(selectors.ProductSort, sortType)
            priceAfterSortByUI = await DriverMethods.GetListOfElementText(selectors.PriceList)
            afterSortPricesInFloatWithoutSign = await priceAfterSortByUI.map(price => parseFloat(price.substring(1)));

            expect(sortedPricesHighToLow).to.deep.equal(afterSortPricesInFloatWithoutSign);
            break

        case "Price (low to high)":
            noSortPrices = await DriverMethods.GetListOfElementText(selectors.PriceList)
            noSortPricesInFloatWithoutSign = await noSortPrices.map(price => parseFloat(price.substring(1)));
            sortedPricesHighToLow = await noSortPricesInFloatWithoutSign.sort(function(a, b){return a-b});

            await DriverMethods.SelectFromDropdownUsingText(selectors.ProductSort, sortType)
            priceAfterSortByUI = await DriverMethods.GetListOfElementText(selectors.PriceList)
            afterSortPricesInFloatWithoutSign = await priceAfterSortByUI.map(price => parseFloat(price.substring(1)));

            expect(sortedPricesHighToLow).to.deep.equal(afterSortPricesInFloatWithoutSign);
            break

        case "Name (Z to A)": 
        /*
        We get the names of products from the mainpage and store them in an array, noSortNames
        We then sort it Descending and store it in an array, sortedNamesZtoA
        We then select the Price (high to low) option from the dropdown
        We end up with prices sorted by the application in an array, namesAfterSortByUI
        Finally we compare both arrays if they are the same
        */
            noSortNames = await DriverMethods.GetListOfElementText(selectors.ProductList)
            sortedNamesZtoA = await noSortNames.sort().reverse();

            await DriverMethods.SelectFromDropdownUsingText(selectors.ProductSort, sortType)
            namesAfterSortByUI = await DriverMethods.GetListOfElementText(selectors.ProductList)

            expect(sortedNamesZtoA).to.deep.equal(namesAfterSortByUI);
            break
         
        case "Name (A to Z)":    
            noSortNames = await DriverMethods.GetListOfElementText( selectors.ProductList)
            sortedNamesZtoA = await noSortNames.sort()

            await DriverMethods.SelectFromDropdownUsingText(selectors.ProductSort, sortType)
            namesAfterSortByUI = await DriverMethods.GetListOfElementText(selectors.ProductList)

            expect(sortedNamesZtoA).to.deep.equal(namesAfterSortByUI);        
            break    

        default :
            throw new IllegalStateException     
    }
})
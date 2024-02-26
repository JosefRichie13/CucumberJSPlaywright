class DriverMethods{


    constructor(){
    }

    async LoadAUrl(url){
        await page.goto(url) 
    }

    async TypeText(element, text){
        await page.locator(element).type(text)
    }

    async ClickButton(element){
        await page.locator(element).click()
    }

    async ClickNthButton(element, Index){
        await page.locator(element).nth(Index).click()
    }

    async TakeScreenshotWithFullPage(path){
        await page.screenshot({path : path, fullPage: true})
    }

    async GetTextFromElement(element){
        return await page.locator(element).textContent()
    }

    async ElementVisibleOrNot(element){
        return await page.locator(element).isVisible()
    }

    async GetListOfElementText(element){
        return await page.locator(element)
    }

}

module.exports = new DriverMethods()
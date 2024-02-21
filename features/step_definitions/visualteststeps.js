const {Given, When, Then} = require('@cucumber/cucumber');
const looksSame = require('looks-same');
const {assert, expect} = require('chai')

 
Given('I verify that the UI is same', async function(){
            await page.screenshot({path : './features/screenshots/visual_success_after.png', fullPage: true})
            await new Promise(resolve => setTimeout(resolve, 3 * 1000))
            const {equal} = await looksSame('./features/screenshots/visual_success_before.png', './features/screenshots/visual_success_after.png', {ignoreCaret: true}, {ignoreAntialiasing: true});
            console.log(equal)
            assert.equal(equal, true) 
        })

 Given('I verify that the UI is different', async function(){
        await page.screenshot({path : './features/screenshots/visual_error_after.png', fullPage: true})
        await new Promise(resolve => setTimeout(resolve, 3 * 1000))
        const {equal} = await looksSame('./features/screenshots/visual_error_before.png', './features/screenshots/visual_error_after.png', {ignoreCaret: true});
        console.log(equal)
        assert.equal(equal, false) 
        })       
const { When, Then, After } = require('cucumber');
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(6000 * 1000);
When('we request the homepage', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
 
    this.driver.wait(until.elementLocated(By.id("nava")));
 
    await this.driver.get('https://www.demoblaze.com/index.html');
});
 
Then('we should receive', async function (dataTable) {
    await this.driver.wait(until.elementLocated(By.xpath("//div[@id='tbodyid']/div")));
    var cards = await this.driver.findElements(By.xpath("//div[@id='tbodyid']/div"));
    var expectations = dataTable.hashes();
    for (let i = 0; i < expectations.length; i++) {
        const name = await cards[i].findElement(By.xpath(".//div[1]/div[1]/h4[1]/a")).getText();
        const price = await cards[i].findElement(By.xpath(".//div[1]/div[1]/h5")).getText();
        const description = await cards[i].findElement(By.xpath(".//div[1]/div[1]/p[@id='article']")).getText();
        console.log(name);
        console.log(price);
        console.log(description);
        assert.equal(name.trim(), expectations[i].name.trim());
        assert.equal(price.trim(), expectations[i].price.trim());
        assert.equal(description.trim(), expectations[i].description.trim());
        
    }

    // test - start
    this.driver.wait(until.elementLocated(By.className("btn-success")));
    cards[0].findElement(By.xpath(".//a")).click();
   // test - end

});
 
After(async function() {
    
   

    this.driver.findElements(By.className("btn-success")).then(function(elements){
        elements.forEach(function (element) {
            element.click();
        });
    });

    // this.driver.close();
});
import { Capabilities, Builder, By } from "selenium-webdriver";

function createDriver() {
    var driver = new Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(Capabilities.chrome())
        .build();
    driver.manage().timeouts().setScriptTimeout(10000);
    return driver;
}

var browser = createDriver();

function logTitle() {
    browser.getTitle().then(function (title) {
        console.log('Current Page Title: ' + title);
    });
}


function logRemainingBalance() {
    browser.findElement(By.css(".main-heading")).then(async function (el) {
        const text = await el.getText();
        console.log(`text is ${text}`);
    });
}


function findMostRelevant() {
    return browser.findElements(By.css('.result-link a')).then(function (result) {
        return result[0];
    });
}

function fillInfo() {
    browser.findElement(By.id('employeeId')).then(result => result.sendKeys('Some employee'));
    browser.findElement(By.xpath("//textarea[@name='comment']")).then(el => el.sendKeys('some comment here'))
}
function SaveAsDraft() {
    browser.findElement(By.css('[title="Save as Draft"]')).then(result => result.click());
}
function closeBrowser() {
    browser.quit();
}

const elemIll = browser.findElement(By.css('#addIll'));
const elemDraft = browser.findElement(By.xpath("//button[@id='draft']"));

browser.get('https://vacation.epam.com'); // 1
browser.then(logTitle); //2
browser.then(logRemainingBalance); // 3

browser.wait(elemIll).then(elem => elem.click()); //4 
browser.wait(elemDraft).then(elem => elem.click()); //5 

browser.then(fillInfo).then(SaveAsDraft);// 6

browser.navigate().back(); // 7

browser.navigate().to('https://vacation.epam.com'); // 8
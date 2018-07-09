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


function logQuestionTitle() {
    browser.findElement(By.css("#question-header h1")).then(function (el) {
        el.getText().then(function (text) {
            console.log('Current Question Title: ' + text)
        });
    });
}

function clickLink(link) {
    link.click();
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function findMostRelevant() {
    return browser.findElements(By.css('.result-link a')).then(function (result) {
        return result[0];
    });
}

function closeBrowser() {
    browser.quit();
}

const elemIll = browser.findElement(By.css('#addIll'));
const elemDraft = browser.findElement(By.xpath("//button[@id='draft']"));
browser.get('https://vacation.epam.com').then(logTitle);
browser.wait(elemIll).then(elem => elem.click());
browser.wait(elemDraft).then(elem => elem.click());

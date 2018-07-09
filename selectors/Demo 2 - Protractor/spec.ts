import { browser, By } from 'protractor'
// spec.js
describe('angularjs homepage', function () {
  beforeEach(function () {
    browser.get('https://onefootball.com/en/home');
  });

  it('should have a 10 items', async function () {
    const list = await browser.findElements(By.css('.popular-container li'));

    expect(list.length).toEqual(10);
  });

  it('should have a title', async function () {
    expect(await browser.getTitle()).toEqual('Onefootball');
  });

  it('click to second item', async function () {
    const list = await browser.findElements(By.css('.popular-container li'));

    const secondItem = list[1];

    await secondItem.click();
  });
});
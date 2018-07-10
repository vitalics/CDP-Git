import { browser, By } from 'protractor'
// spec.ts
describe('angularjs homepage', function () {
  beforeEach(function () {
    browser.get('https://onefootball.com/en/home');
  });

  it('should have a 10 items', async function () { // 1
    const list = await browser.findElements(By.css('.popular-container li'));

    expect(list.length).toEqual(10);
  });

  it('should have a title', async function () { // 2
    expect(await browser.getTitle()).toEqual('Onefootball');
  });

  it('chech that first item include FIFA text', async function () { // 3
    const list = await browser.findElements(By.css('.popular-container li'));

    const secondItem = list[1];

    expect(secondItem).toContain('FIFA');
  });

  it('choose first top news', async function () { // 4
    const list = await browser.findElements(By.css('.grid-gallery .grid-item'));

    const firstNews = list[0];

    const title = await firstNews.findElement(By.css('.short-title'));

    expect(title).toMatch('France 1-0 Belgium: Samuel Umtiti sends Les Bleus to the final');

    const firstElem = await firstNews.findElement(By.css('.of-card-image-img'));
    firstElem.click();
  });

  it('choose first top news', async function () { // 5
    const relatedNews = await browser.findElements(By.css('.grid-news .grid-item a'));

    const firstRelatedNews = relatedNews[0];

    firstRelatedNews.click();
  });

  it('return back', function () { // 6
    browser.navigate().back();
  });

  it('refresh', function () { // 7
    browser.navigate().refresh();
  });

  it('type Ronaldo to search input', async function () { // 8
    const searchableText = 'Ronaldo';
    const searchForm = await browser.findElement(By.css('form.header-search'));
    const searchInput = await searchForm.findElement(By.className('header-search-input'));
    await searchInput.sendKeys(searchableText);
    const searchResult = await searchForm.findElement(By.css('.search-results-message'));

    const searchResultText = await searchResult.getText();
    expect(searchResultText).toBe(`Oops! Looks like there are no results matching "${searchableText}" `);
  });
});
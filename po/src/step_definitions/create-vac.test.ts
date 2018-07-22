import { binding, given, then, when } from 'cucumber-tsflow';

import { HomePage, Page, VacPage } from 'pages';
import { isNullOrUndefined } from 'util';

import { Inject } from 'utils/ioc';

import { BaseTest } from './base.test';

@binding()
class MyFirstSteps extends BaseTest {
  private page: Page | undefined;
  @Inject() private homePage!: HomePage;
  @Inject() private vacPage!: VacPage;

  @given(/^User open "(.*)"$/)
  public openPage(pageName: string): void {
    const page = this.pageFactory.getPage(pageName);
    this.page = page;
    page.open();
  }

  @when(/^User click "(.*)" button$/)
  public async clickToButton(buttonName: string): Promise<void> {
    this.homePage.vacButton.click();
  }

  @then(/^Url has changed$/)
  public UrlChanged(): void {
    const homepage = Page.define(HomePage);
    if (homepage.url.includes('another/url')) {
      // TODO: make fail test
      throw new Error('test is fail');
    }
  }

  @then(/^User see form$/)
  public form(): void {
    if (isNullOrUndefined(this.vacPage.form)) {
      // fail test
      throw new Error();
    }
    browser.scroll(this.vacPage.form.employee.selector).click();
    browser.execute(() => alert('clicked!'));
  }

  @then(/^User click on "(.*)" button$/)
  public clickToDraftButton(buttonName: string): void {
    browser.execute(() => {
      const color = this.vacPage.form.draftButton.getCssProperty('background-color').value;
      const elem = document.querySelector(this.vacPage.form.draftButton.getAttribute('id'));
      elem!.setAttribute('background-color', 'red');
      this.vacPage.form.draftButton.click();
      elem!.setAttribute('background-color', color);
    });
  }
}

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
  }

  @then(/^User click on "(.*)" button$/)
  public clickToDraftButton(buttonName: string): void {
    this.vacPage.form.draftButton.click();
  }
}

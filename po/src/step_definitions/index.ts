import { TableDefinition } from 'cucumber';
import { binding, given } from 'cucumber-tsflow';

import { HomePage } from 'pages';

import { TableParser } from 'utils/cucumber';
import { precondition } from 'utils/decorators';
import { driver } from 'utils/driver';
import { Inject } from 'utils/ioc';

import { BaseTest } from './base.test';

@binding([HomePage])
class MyFirstSteps extends BaseTest {

  @Inject() private tableParser!: TableParser;

  @Inject() private homePage1!: HomePage;

  public constructor(
    protected homePage: HomePage
  ) {
    super();
  }

  @given(/^I open the page "(.*)"$/)
  public openPage(pageName: string): void {
    const page = this.pageFactory.get(HomePage);
    page.open();
  }

  @precondition(driver.wait)
  @given(/^I sign up and create Doodle account "(.*)"$/)
  public signUp(accountType: string): void {
    this.homePage.clickToSignUpButton();
  }

  @given(/^I parse the table$/)
  public someStep(table: TableDefinition): void {
    const mappedTable = this.tableParser.parse(table);
    console.dir(mappedTable);
  }
}

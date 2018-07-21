import { after, before, binding } from 'cucumber-tsflow';
import { PageFactory } from 'pages';
import { Inject } from 'utils';

@binding()
export class BaseTest {
  @Inject() public pageFactory!: PageFactory;

  @before()
  public beforeTest(): void {
    // tslint:disable-next-line:no-console
    console.log('before test');
  }

  @after()
  public afterTest(): void {
    // tslint:disable-next-line:no-console
    console.log('after test');
  }
}

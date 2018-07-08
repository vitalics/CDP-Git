import { suite, test } from 'mocha-typescript';

import { Driver } from '../driver';
import { Inject } from '../ioc';

@suite()
export class SimpleTest {
  @Inject() private driver: Driver;

  @test('open browser')
  public OpenBrowser(): void {
    this.driver.instance.get('https://goole.com');
  }
}
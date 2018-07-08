import { Injectable } from 'ioc';
import { Builder, ThenableWebDriver } from 'selenium-webdriver';

@Injectable()
export class Driver {
  public instance: ThenableWebDriver = new Builder().forBrowser('chrome').build();

  public newInstance(config: ThenableWebDriver): void {
    config ? this.instance = config : this.instance = this.instance;
  }
}

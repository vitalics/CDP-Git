import 'reflect-metadata';

import { Openable, PageLike } from 'types';
import { inject, Injectable } from 'utils';
import { page } from 'utils/decorators';
import { timerify } from 'utils/measure';
import { Client, RawResult } from 'webdriverio';

/**
 * Abstract page wich describe all page properties
 */
@Injectable()
@page({ url: 'https://vacation.epam.com' })
export abstract class Page implements Openable {
  /**
   * title of page
   */
  public title: string = browser.title().value;

  /**
   * url is changed with reflection, by default is empty
   */
  public url: string = '';

  /**
   * @constructor
   * define url with reflection
   */
  public constructor() {
    const thisProto: object = Reflect.getPrototypeOf(this);
    this.url = Reflect.getMetadata(`page_${thisProto.constructor}`, thisProto.constructor).url;
  }

  public static define<T extends Page>(p?: PageLike): T | Page {
    if (typeof p === 'undefined') {
      throw new Error('page is not defined');
    }
    return inject.get(p) as T;
  }
  /**
   * open page with defined url or custom url
   * @param url url witch will be opened
   */
  @timerify()
  public open(url: string = this.url): void {
    browser.pause(1000);
    browser.url(`${url}`);
    browser.pause(300);
  }

  /**
   * getting status page: is ready state is complete
   */
  public waitPageReady(): void {
    browser.waitUntil(() => {
      const state: Client<RawResult<string>> & RawResult<string> = browser.execute('() => document.readyState');
      return state.value === 'complete';
    });
  }
  public cast<T extends Page>(p: PageLike<T>): T {
    return inject.get(p);
  }

}

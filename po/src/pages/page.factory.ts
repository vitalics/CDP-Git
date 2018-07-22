import { PageLike } from 'types';
import { inject, Injectable } from 'utils/ioc';

import { Page } from './abstract.page';
import { HomePage } from './home';

enum Pages {
  Home = 'Homepage',
}

/**
 * Page factory witch can return any page instance by name
 */
@Injectable()
export class PageFactory {

  /**
   * getting page instance by one of reserved name, if page cannot found - getting Error
   * @param pageName name of the getting page
   */
  public getPage<T extends Page>(pageName: string): HomePage | T {
    switch (pageName) {
      case Pages.Home:
        return new HomePage();

      default:
        throw new Error(`cannot find page with name ${pageName}`);
    }
  }

  public get<T extends Page>(page: PageLike<T>): T {
    return inject.get(page);
  }
}

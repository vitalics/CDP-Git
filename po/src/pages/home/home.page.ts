import { HeaderComponent } from 'components';
import { Page } from 'pages';
import { driver, Injectable } from 'utils';

import { component, page, postcondition, precondition, safe } from 'utils/decorators';

/**
 * Home page is entry point of application:
 * @url /
 * @components [[HeaderComponent]]
 */
// tslint:disable-next-line:max-classes-per-file
@Injectable()
@page({ url: '/' })
export class HomePage extends Page {

    @component('header.d-headerView')
    public readonly header!: HeaderComponent;

    @safe()
    public unsafemethod(arg: any): boolean {
        return arg.length > 0;
    }

    @precondition()
    @postcondition(() => driver.wait)
    public clickToSignUpButton(): void {
        // driver.clickTo(this.header.signUpButton);
        this.unsafemethod(null);
    }
}

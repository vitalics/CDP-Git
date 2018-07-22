import { Page } from 'pages';
import { Injectable } from 'utils';

import { HeaderComponent } from 'components';
import { Class, Elem } from 'types';
import { component, element, page } from 'utils/decorators';

/**
 * Home page is entry point of application:
 * @url /
 * @components [[HeaderComponent]]
 */
// tslint:disable-next-line:max-classes-per-file
@Injectable()
@page({ url: '/' })
export class HomePage extends Page {
    @component('.menu-padding') public readonly headerComponent!: HeaderComponent;
    @element('#addVac') public readonly vacButton!: Elem;
}

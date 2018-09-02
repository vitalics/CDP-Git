import { Page } from './abstract.page';

import { HeaderComponent } from '../components/header.component';
import { component } from '../utils/protractor/component';

export class HomePage extends Page {
    @component('.header-ui') public readonly header!: HeaderComponent;
}
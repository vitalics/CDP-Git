import { Page } from './abstract.page';

import { HeaderComponent } from '../components/header.component';
import { listen } from '../utils/logger/listen.decorator';
import { component } from '../utils/protractor/component';

export class HomePage extends Page {
    @listen() @component('.header-ui') public readonly header!: HeaderComponent;
}
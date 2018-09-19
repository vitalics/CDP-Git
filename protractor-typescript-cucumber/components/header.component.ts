import { browser, ElementArrayFinder } from 'protractor';
import { components, elements } from '../utils/protractor';
import { Component } from './abstract.component';
import { HeaderItemComponent } from './headerItem.component';

import { listen } from '../utils/logger/listen.decorator';

export class HeaderComponent extends Component {
    @listen()
    @elements('.top-navigation__row .top-navigation__item')
    public readonly items!: ElementArrayFinder;
}
import { ElementFinder } from 'protractor';

import { element, elements } from '../utils';
import { Component } from './abstract.component';

import { listen } from '../utils/logger/listen.decorator';

export class HeaderItemComponent extends Component {
    public root: ElementFinder = super.root;
    @element('.top-navigation__item-link') @listen() public readonly info!: ElementFinder;
    @element('.top-navigation__flyout-list') @listen() public readonly subMenu!: ElementFinder;
}

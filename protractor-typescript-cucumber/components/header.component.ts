import { browser, ElementFinder } from 'protractor';
import { components } from '../utils/protractor';
import { Component } from './abstract.component';
import { HeaderItemComponent } from './headerItem.component';

export class HeaderComponent extends Component {
    @components('.top-navigation__row .top-navigation__item', HeaderItemComponent, 3)
    public readonly items!: HeaderItemComponent[];
}
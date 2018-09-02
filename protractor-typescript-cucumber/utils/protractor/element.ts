import 'reflect-metadata';

import { browser, ElementFinder } from 'protractor';
import { Component } from '../../components/abstract.component';

export function element<T extends Component>(locator: string, component?: T): PropertyDecorator {
    return (target, key) => {
        Reflect.defineProperty(target, key, {
            get: (): ElementFinder => component ? component.root.$(locator) : browser.$(locator),
        });
    };
}
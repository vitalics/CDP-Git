import 'reflect-metadata';

import { browser, ElementArrayFinder } from 'protractor';
import { Component } from '../../components/abstract.component';

export function elements<T extends Component>(locator: string, component?: T): PropertyDecorator {
    return (target, key) => {
        const cls = target.constructor;
        if (cls.prototype === Component) {
            Reflect.defineProperty(target, key, {
                get: (): ElementArrayFinder => component ? component.root.$$(locator) : browser.$$(locator),
            });
        }
        Reflect.defineProperty(target, key, {
            get: (): ElementArrayFinder => component ? component.root.$$(locator) : browser.$$(locator),
        });
    };
}
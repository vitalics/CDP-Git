import 'reflect-metadata';

import { browser, ElementFinder } from 'protractor';
import { Component } from '../../components/abstract.component';
import { loggerListener } from '../logger/LoggerListiner';

export function element<T extends Component>(locator: string, component?: T): PropertyDecorator {
    return (target, key) => {
        Reflect.defineProperty(target, key, {
            get: (): ElementFinder => {
                if (component) {
                    const item = component.root.$(locator);
                    loggerListener.emit('propertyGet', key, item);
                    return item;
                } else {
                    const item = browser.$(locator);
                    loggerListener.emit('propertyGet', key, item);
                    return item;
                }
            },
        });
    };
}
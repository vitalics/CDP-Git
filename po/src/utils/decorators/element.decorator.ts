import 'reflect-metadata';

import { Elem } from 'types';

/**
 * search element from body or parent with specific locator, setting to property finded element and make as readlonly
 * @param locator locator for searching from parent or body
 * @param parent element from searhing
 * @example
 * ```
 * ``` typescript
 *
 * class MyPage extends Page{
 *  @element('.fromBodySearching')
 *  public readonly fromBodySearching!: ElementFinder;
 *
 *  @element('.subElementSeraching', this.fromBodySearching)
 *  public readonly subElement!: ElementFinder;
 * }
 * ```
 */
export function element(locator: string, parent?: Elem): PropertyDecorator {
    return (target: object, propertyKey: string | symbol): void => {
        Reflect.defineProperty(target, propertyKey, {
            get: (): Elem => parent ? parent.$(locator) : browser.$(locator),
        });
    };
}

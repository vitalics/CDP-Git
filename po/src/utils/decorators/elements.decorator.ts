import 'reflect-metadata';
import { Elem, Elems } from 'types';

/**
 * search elements from body or parent with specific locator, setting to property finded element and make as readlonly
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
 *  @elements('.subElementSeraching', this.fromBodySearching)
 *  public readonly subElement!: ElementArrayFinder;
 * }
 * ```
 */
export function elements(locator: string, parent?: Elem): PropertyDecorator {
    return (target: object, propertyKey: string | symbol): void => {
        Reflect.defineProperty(target, propertyKey, {
            get: (): Elems => parent ? parent.$$(locator) : browser.$$(locator),
        });
    };
}

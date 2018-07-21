import 'reflect-metadata';

import { Component } from 'components';
import { FunctionLike } from 'types';

/**
 * creating component instance with parent locator
 * @param locator locator for parent from body. Return new component instance
 * @example
 * ```
 * ``` typescript
 *
 * class SomeComponent extends Component{
 *  // some logic component here
 * }
 * class SomePage extends Page{
 *  @component('someSelector')
 *  public readonly someComponent!:SomeComponent // ! is defined operator
 * }
 *
 * ```
 */
export function component<TComponent extends Component>(locator: string): PropertyDecorator {
    return (target: any, propertyKey: string | symbol): void => {
        const type = Reflect.getMetadata('design:type', target, propertyKey) as FunctionLike;
        Reflect.defineProperty(target, propertyKey, {
            get: (): TComponent => Reflect.construct(type, [locator]),
        });
    };
}

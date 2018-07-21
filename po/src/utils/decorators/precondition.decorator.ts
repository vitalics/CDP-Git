import { FunctionLike } from 'types';

/**
 * executing functions before method executing
 * @param fns array of functions
 * @example
 * ```
 * ``` typescript
 *
 * class SomeClass{
 *  @precondition(() => console.log('Hello from pre condition'))
 *  public someCoolMethod(someArg:string){
 *      console.log(someArg);
 *  }
 * }
 * const someClass = new SomeClass();
 * someClass.someCoolMethod('test') // console output: 'Hello from pre condition' 'test'
 * ```
 */
export function precondition(...fns: FunctionLike[]): MethodDecorator {
    return (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void | TypedPropertyDescriptor<any> => {
        const oldDescriptor = descriptor.value as FunctionLike;

        descriptor.value = function pre(...args: any[]): void {
            for (const fn of fns) {
                const bindedFn = fn.bind(this, target) as FunctionLike;
                bindedFn.apply(this, args);
            }
            oldDescriptor.apply(this, args);
        };
        return descriptor;
    };
}

import { FunctionLike } from 'types';

/**
 * Execute function after executing original method
 * @param fns Array of function witch will be executed
 *
 * @example
 * ```
 * ``` typescript
 *
 * class SomeClass{
 *  @postcondition(() => console.log('Hello from post condition'))
 *  public someCoolMethod(someArg:string){
 *      console.log(someArg);
 *  }
 * }
 * const someClass = new SomeClass();
 * someClass.someCoolMethod('test') // console output: 'test' 'Hello from post condition'
 *
 * ```
 */
export function postcondition(this: any, ...fns: FunctionLike[]): MethodDecorator {
    return (
        _target: object,
        _propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void | TypedPropertyDescriptor<any> => {
        const oldDescriptor = descriptor.value as FunctionLike;
        oldDescriptor.bind(this);

        descriptor.value = function post(...args: any[]): any {
            const result = oldDescriptor.apply(this, args);
            for (const fn of fns) {
                fn.bind(result).apply(this, args);
            }
        };
        return descriptor;
    };
}

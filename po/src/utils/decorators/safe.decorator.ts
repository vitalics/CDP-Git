import 'reflect-metadata';

import { FunctionLike } from 'types';

type ErrorLike<E extends Error = Error> =
  | ErrorConstructor
  | TypeErrorConstructor
  | EvalErrorConstructor
  | SyntaxErrorConstructor
  | ReferenceErrorConstructor
  | RangeErrorConstructor
  | Error
  | TypeError
  | EvalError
  | SyntaxError
  | ReferenceError
  | RangeError
  | E extends Error ? E : Error;

/**
 * make function `safe` - trying to execute, if cannot - write to console error and don't stop program executing
 * @param error function with defined error handler and stop execuing, if error is catched
 * @example
 * ```
 * ``` typescript
 *
 * class SomeClass{
 *  @safe()
 *  public unsafeMethod(foo:string | null){
 *    return foo.length > 0;
 *  }
 * }
 *
 * const someClass = new SomeClass();
 * console.log('start executing');
 * someClass.unsafeMethod(null);
 * console.log('continue executing');
 * // start executing
 * // cannot read property 'length' of null
 * // continue executing
 * ```
 */
export function safe<E = ErrorLike>(error?: E, message?: string): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as FunctionLike;

    descriptor.value = function safeWrapper(...args: any[]): any {
      try {
        oldDescriptor.apply(undefined, args);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(`save decorator catch error: ${e}`);
        if (error) {
          const casted = error as any;
          if (message) {
            casted.message = message;
          }
          throw new casted(casted.message || e.message);
        }
      }
    };
    return descriptor;
  };
}
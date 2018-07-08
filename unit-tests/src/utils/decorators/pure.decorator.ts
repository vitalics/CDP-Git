import 'reflect-metadata';
import { isNullOrUndefined, isUndefined } from 'util';

export function Pure(): MethodDecorator {
  // tslint:disable-next-line:no-any
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as Function;

    if (!oldDescriptor || !descriptor) {
      throw new Error(`cannot read descriptor from ${target}.${propertyKey.toString()}`);
    }

    // tslint:disable-next-line:typedef no-any
    descriptor.value = function (...args: any[]) {
      const result = oldDescriptor.apply(this, args);
      const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
      if (isNullOrUndefined(result) && !isUndefined(returnType)) {
        throw new Error(`result for method ${oldDescriptor} is not pure`);
      }
      return result;
    };
    return descriptor;
  };
}
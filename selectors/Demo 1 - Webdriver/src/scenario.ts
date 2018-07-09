import 'reflect-metadata';

export function scenario(this): MethodDecorator {
  return (target: any, key, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as Function;

    descriptor.value = function (...args: any[]) {
      const instance = Reflect.construct(target.constructor, []);
      const result = oldDescriptor.apply(instance);
      return result;
    }
    descriptor.value();

    return descriptor;
  }
}
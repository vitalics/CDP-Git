import 'reflect-metadata';

import { Injector as _Injector } from 'di-typescript';

export const injector = new _Injector();

export function Inject(): PropertyDecorator {
  return (target, propertyKey) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    Reflect.defineProperty(target, propertyKey, {
      get: () => injector.get(type),
    });
  };
}

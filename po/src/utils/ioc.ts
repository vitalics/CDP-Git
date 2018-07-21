import 'reflect-metadata';

import { Inject as _Inject, Injector as _Injector } from 'di-typescript';

export const inject = new _Injector();

export const Injectable = (): ClassDecorator => (target) => _Inject(target);

export const Inject = (): PropertyDecorator => (target, key) => {
  const type = Reflect.getMetadata('design:type', target, key);

  Reflect.defineProperty(target, key, {
    get: () => inject.get(type),
  });
};

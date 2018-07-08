import { Inject as _Inject, Injector as _Injector } from 'di-typescript';
import 'reflect-metadata';

export const injector = new _Injector();

export const Inject = (): PropertyDecorator => {
  return (target, key) => {
    const type = Reflect.getMetadata('desing:type', target, key);
    Reflect.defineProperty(target, key, {
      get: injector.get(type),
    });
  };
};

export const Injectable = (): ClassDecorator => {
  return (target) => _Inject(target);
};

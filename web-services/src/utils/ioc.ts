import 'reflect-metadata';

import { Inject as _Inject, Injector } from 'di-typescript';

const injector = new Injector();

export function Injectable(): ClassDecorator {
  return (target) => {

    return _Inject(target);
  };
}

export function Inject(...args: any[]): PropertyDecorator {
  return (target, key) => {
    let instance: any;
    const type = Reflect.getMetadata('design:type', target, key);

    if (args.length) {
      instance = Reflect.construct(type, args);
    } else {
      instance = injector.get(type);
    }

    Reflect.defineProperty(target, key, {
      get: () => instance,
    });
  };
}

export default {
  Inject,
  Injectable,
};
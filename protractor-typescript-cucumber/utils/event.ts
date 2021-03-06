import 'reflect-metadata';

import { EventEmitter as _EventEmitter } from 'events';

interface Listenable {
  method: (...args: any[]) => void;
  eventName: string;
}
type Onable = Listenable;
type Oncanable = Listenable;

export function on(event: string): MethodDecorator {
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as (...args: any[]) => void;

    const reester: Onable[] = Reflect.getMetadata(
      'onableReester',
      target.constructor
    ) || [];

    reester.push({
      eventName: event,
      method: oldDescriptor,
    });

    Reflect.defineMetadata('onableReester', reester, target.constructor);

    return descriptor;
  };
}

export function once(event: string): MethodDecorator {
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as (...args: any[]) => void;

    const reester: Onable[] = Reflect.getMetadata(
      'oncableReester',
      target.constructor
    ) || [];

    reester.push({
      eventName: event,
      method: oldDescriptor,
    });

    Reflect.defineMetadata('oncableReester', reester, target.constructor);

    return descriptor;
  };
}

export function Eventable(): ClassDecorator {
  return (target) => {
    return new Proxy(target, {
      construct: (newTarget, args) => {
        const instance = Reflect.construct(newTarget, args) as _EventEmitter;

        const onaleReester: Onable[] = Reflect.getMetadata('onableReester', target) || [];
        const oncableReester: Oncanable[] = Reflect.getMetadata('oncableReester', target) || [];

        onaleReester.forEach((e) => instance.on(e.eventName, e.method));
        oncableReester.forEach((e) => instance.once(e.eventName, e.method));

        return instance;
      },
    });
  };
}
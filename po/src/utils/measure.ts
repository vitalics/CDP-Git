import { performance, PerformanceObserver } from 'perf_hooks';
import { FunctionLike } from 'types';

const obs = new PerformanceObserver((list) => {
  console.dir(list.getEntries()[0].duration);
});
obs.observe({ entryTypes: ['function'] });

export function timerify(): MethodDecorator {
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    const oldDescriptor = descriptor.value as FunctionLike;

    descriptor.value = function wrapper(...args: any[]): any {
      const wrapped = performance.timerify(oldDescriptor);
      const result = wrapped.apply(this, args);

      return result;

    };
    return descriptor;
  };
}
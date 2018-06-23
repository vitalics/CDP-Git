import { Inject as DiInject } from 'di-typescript';

export function Injectable(): ClassDecorator {
  return target => DiInject(target);
}
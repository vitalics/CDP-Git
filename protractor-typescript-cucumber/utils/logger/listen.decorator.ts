import 'reflect-metadata';
import { loggerListener } from './LoggerListiner';

interface Dictionary {
    [name: string]: any;
}
type propertyKey = string | symbol;

export function listen(): PropertyDecorator {
    return (target: Dictionary, key: string) => {
        const value = target[key];
        loggerListener.emit('propertyGet', key, value);
        Reflect.defineProperty(target, key, {
            get: () => value,
            set: (newValue: any) => {
                loggerListener.emit(`propertyChange`, target[key], newValue);
                target[key] = newValue;
            },
        });
    };
}
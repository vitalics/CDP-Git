import { EventEmitter } from 'events';
import { Eventable, on } from '../event';
import { Logger } from './Logger';

@Eventable()
class LoggerListener extends EventEmitter {
    @on('propertyChange')
    public propertyChange(propertyName: string, prevValue: any, newValue: any): void {
        if (typeof newValue === ('object' || 'function')) {
            Logger.append(`property ${propertyName} change: from ${prevValue} to ${newValue.toString()}`);
        } else {
            Logger.append(`property ${propertyName} change: from ${prevValue} to ${newValue}`);
        }
    }
    @on('propertyGet')
    public propertyGet(propertyName: string, value: any): void {
        if (typeof value === ('object' || 'function')) {
            Logger.append(`property ${propertyName} get: to ${value.toString()}`);
        } else {
            Logger.append(`property ${propertyName} get: to ${value}`);
        }
    }
}

export const loggerListener = new LoggerListener();
loggerListener.on('propertyChange', (propertyName: string, prevValue: any, newValue: any) => {
    if (typeof newValue === ('object' || 'function')) {
        Logger.append(`property ${propertyName} change: from ${prevValue} to ${newValue.toString()}`);
    } else {
        Logger.append(`property ${propertyName} change: from ${prevValue} to ${newValue}`);
    }
});
loggerListener.on('propertyGet', (propertyName: string, value: any) => {
    if (typeof value === ('object' || 'function')) {
        Logger.append(`property ${propertyName} get: to ${value.toString()}`);
    } else {
        Logger.append(`property ${propertyName} get: to ${value}`);
    }
});

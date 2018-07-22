import { Page } from 'pages';
import { Client, Element, RawResult } from 'webdriverio';

export * from './decorators';
export * from './parser';

/**
 * describe any function with optional generic parameter(return type of function)
 */
export type FunctionLike<T = void | any> = (...args: any[]) => T;

export type Elem = Client<RawResult<Element>> & RawResult<Element>;

export type Elems = Array<Client<RawResult<Element>>> & Array<RawResult<Element>>;

export type Class<T> = new (...args: any[]) => T;
export interface Openable {
  open(url?: string): void;
}
export type PageLike<T extends Page = Page> = Class<T>;
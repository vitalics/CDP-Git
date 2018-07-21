import { TableDefinition } from 'cucumber';
import { FunctionLike } from './';

/**
 * defining abstract parser with parse methods, return parsed data as Readonly
 */
export interface Parser {
  parse(data: any): Readonly<any>;
  parse<T>(data: any, mapFunction: FunctionLike<T>): Readonly<T>;
}

/**
 * specific interface for parsing cucumber table and return data as readonly key-value pair
 */
export interface TableParserInterface extends Parser {
  parse<T>(table: TableDefinition, mapFunction: FunctionLike<T>): Readonly<T>;
  parse(table: TableDefinition): Readonly<Record<string, string>>;
}

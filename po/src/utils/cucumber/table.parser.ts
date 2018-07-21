import { TableDefinition } from 'cucumber';
import { FunctionLike, TableParserInterface } from 'types';

import { Injectable } from '../ioc';

@Injectable()
export class TableParser implements TableParserInterface {
  /**
   * parsing table by defined rules and return as object without header
   * @param table cucumber table
   * @example
   * ``` Gherkin
   *
   * | Title1 | Title2 |
   * | Data11 | Data12 |
   * | Data21 | Data22 |
   * ```
   * ``` typescript
   *
   * public someStep(table:TableDefinition):void {
   *  const myParsedTable:Readonly<{'testData':number}> = tableParser.parse(table, () => {'testData': 123})
   *  console.log(myParsedTable) // {'testData': 123}  also all keys is readonly
   * }
   * ```
   */
  public parse<T>(table: TableDefinition, mapFunction: FunctionLike<T>): Readonly<T>;
  /**
   * Parse cucumber table to object, exclude heading(if map function is not defined).
   * This method may be rewriting, if map function is defined
   * @param table cucumber table
   * @param mapFunction custom function for mapping cucumber table
   * @example
   * ``` Gherkin
   *
   * | Title1 | Title2 |
   * | Data11 | Data12 |
   * | Data21 | Data22 |
   * ```
   * ``` typescript
   *
   * public someStep(table:TableDefinition):void {
   *  const parsedTable: Readonly<Record<string, string>> = tableParser.parse(table)
   *  console.log(parsedTable) // {'data11': 'data12', 'data21': 'data22'} also all keys is readonly
   * }
   * ```
   */
  public parse(table: TableDefinition): Readonly<Record<string, string>>;
  public parse<T>(table: TableDefinition, mapFunction?: FunctionLike<T>): Readonly<T> {
    if (mapFunction) {
      const value = mapFunction.apply(this) as Readonly<T>;
      return value;
    }

    const o: { [name: string]: any } = {};
    table.rows().forEach((row: any) => {
      const key = row[0].toLowerCase();
      const value = row[1];

      let item = o[key] as any;
      if (o[key] && !Array.isArray(o[key])) {
        item = [o[key]] as any;
      }

      if (Array.isArray(o[key])) {
        item.push(value);
      } else {
        item = value;
      }
    });

    return o as any;
  }

}

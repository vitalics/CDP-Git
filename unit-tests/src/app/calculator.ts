import { Injectable, Pure } from '../utils';

@Injectable()
export class Calculator {
  @Pure()
  public add(num1: number, num2: number): number {
    return num1 + num2;
  }

  @Pure()
  public multiplicity(num1: number, num2: number): number {
    return num1 * num2;
  }
}

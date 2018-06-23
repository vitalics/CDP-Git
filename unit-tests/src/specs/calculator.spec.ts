import 'reflect-metadata';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';

import { Calculator } from '../app';
import { multiplicityCase, sumCase } from '../testcases';
import { Inject } from '../utils';

class BaseCalculatorTest {
  @Inject() public calculator!: Calculator;
}

@suite('multilplicity tests')
class MulCalculatorTest extends BaseCalculatorTest {

  @test(`multiply ${multiplicityCase.actual}. Expected ${multiplicityCase.expected}`)
  public positive(): void {
    const result = this.calculator.multiplicity(multiplicityCase.actual[0], multiplicityCase.actual[1]);
    expect(result).to.be.equal(multiplicityCase.expected);
  }
}

@suite('summing tests')
class SumCalculatorTest extends BaseCalculatorTest {
  @test(`sum ${sumCase.actual}. Expected ${sumCase.expected}`)
  public sum(): void {
    const result = this.calculator.add(sumCase.actual[0], sumCase.actual[1]);
    expect(result).equal(sumCase.expected);
  }
}

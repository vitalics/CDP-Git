export interface Boxed<T> {
  value: T;
}

export interface TestCase<A, E = A> {
  actual: A;
  expected: E;
}

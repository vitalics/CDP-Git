export function runParallel(descriptor: Function, ...args: any[]) {
  process.nextTick(descriptor, args);
}
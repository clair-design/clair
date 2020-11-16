// https://gist.github.com/jcalz/381562d282ebaa9b41217d1b31e2c211
export function tuple<T extends number>(...args: T[]): T[]
export function tuple<T extends string>(...args: T[]): T[]
export function tuple<T extends any>(...args: T[]): T[] {
  return args
}

export type ElementOf<T> = T extends (infer E)[] ? E : T

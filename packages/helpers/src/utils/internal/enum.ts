export function enumOf<T extends number>(o: Array<T>): { [K in T]: K }
export function enumOf<T extends string>(o: Array<T>): { [K in T]: K }
export function enumOf<T extends number | string>(
  o: Array<T>
): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}

// const Direction = enumOf(['North', 'South', 'East', 'West'])
// type Direction = keyof typeof Direction

// const Direction = enumOf([1, 2, 3])
// type Direction = keyof typeof Direction

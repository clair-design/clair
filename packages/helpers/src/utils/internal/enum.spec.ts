import { enumOf } from './enum'

it('should transform string[] to enum', () => {
  const Direction = enumOf(['North', 'South', 'East', 'West'])
  type Direction = keyof typeof Direction
  const dir: Direction = 'North'
  expect(dir).toBe(Direction.North)
})

it('should transform number[] to enum', () => {
  const Bool = enumOf([0, 1])
  type Bool = keyof typeof Bool
  const bool: Bool = 1
  expect(bool).toBe(Bool[1])
})

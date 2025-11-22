import { ValueObject } from './value-object'

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super()
  }
}

describe('ValueObject unit tests', () => {
  test('should be equals when two simple value objects have the same value', () => {
    const vo1 = new StringValueObject('test')
    const vo2 = new StringValueObject('test')

    expect(vo1.equals(vo2)).toBe(true)

    const vo3 = new ComplexValueObject('test', 1)
    const vo4 = new ComplexValueObject('test', 1)

    expect(vo3.equals(vo4)).toBe(true)
  })

  test('should not be equals when two simple value objects have different values', () => {
    const vo1 = new StringValueObject('test1')
    const vo2 = new StringValueObject('test2')

    expect(vo1.equals(vo2)).toBe(false)

    const vo3 = new ComplexValueObject('test', 1)
    const vo4 = new ComplexValueObject('test', 2)

    expect(vo3.equals(vo4)).toBe(false)
  })

  test('should not be equals when comparing with a non-value object', () => {
    const vo1 = new StringValueObject('test')
    const nonVo: any = { value: 'test' }

    expect(vo1.equals(nonVo)).toBe(false)

    const vo2 = new ComplexValueObject('test', 1)
    const nonVo2: any = { prop1: 'test', prop2: 1 }

    expect(vo2.equals(nonVo2)).toBe(false)
  })
})

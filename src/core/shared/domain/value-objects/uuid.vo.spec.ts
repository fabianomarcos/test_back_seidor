import { validate as uuidValidate } from 'uuid'
import { Uuid, InvalidUuidError } from './uuid.vo'

describe('Uuid Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  test('should throw InvalidUuidError when an invalid UUID is provided', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid Uuid when no value is provided', () => {
    const uuid = new Uuid()
    expect(uuid).toBeInstanceOf(Uuid)
    expect(uuid.value).toBeDefined()
    expect(typeof uuid.value).toBe('string')
    expect(uuidValidate(uuid.value)).toBe(true)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should be accept a valid UUID string', () => {
    const uuid = new Uuid('550e8400-e29b-41d4-a716-446655440000')
    expect(uuid).toBeInstanceOf(Uuid)
    expect(uuid.value).toBe('550e8400-e29b-41d4-a716-446655440000')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})

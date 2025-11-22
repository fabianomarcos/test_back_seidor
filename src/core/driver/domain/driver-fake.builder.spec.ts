import { DriverFakeBuilder } from './driver-fake.builder'

describe('DriverFakeBuilder unit tests', () => {
  describe('driver_id prop', () => {
    const faker = DriverFakeBuilder.aDriver()

    test('should throws error when any with method has called', () => {
      expect(() => faker.driver_id).toThrow(
        new Error("Property driver_id not have a factory, use 'with' methods"),
      )
    })
  })
})

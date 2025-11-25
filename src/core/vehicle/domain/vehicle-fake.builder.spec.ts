import { VehicleFakeBuilder } from './vehicle-fake.builder'

describe('VehicleFakeBuilder unit tests', () => {
  describe('driver_id prop', () => {
    const faker = VehicleFakeBuilder.aVehicle()

    test('should throws error when any with method has called', () => {
      expect(() => faker.vehicle_id).toThrow(
        new Error("Property vehicle_id not have a factory, use 'with' methods"),
      )
    })
  })
})

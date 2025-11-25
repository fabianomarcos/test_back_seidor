import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { CreateVehicleUseCase } from './create-vehicle.use-case'

describe('CreateVehicleUseCase unit tests', () => {
  let usecase: CreateVehicleUseCase
  let repository: VehicleInMemoryRepository

  beforeEach(() => {
    repository = new VehicleInMemoryRepository()
    usecase = new CreateVehicleUseCase(repository)
  })

  it('should throw an error when aggregate is not valid', async () => {
    let input = {
      brand: 'F'.repeat(256),
      color: 'amarelo',
      plate: 'hgg-1111',
    }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      'Entity Validation Error',
    )

    input = {
      brand: 'F'.repeat(255),
      color: 'F'.repeat(256),
      plate: 'hgg-1111',
    }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      'Entity Validation Error',
    )

    input = {
      brand: 'F'.repeat(255),
      color: 'F'.repeat(255),
      plate: 'hgg-11111',
    }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      'Entity Validation Error',
    )
  })
})

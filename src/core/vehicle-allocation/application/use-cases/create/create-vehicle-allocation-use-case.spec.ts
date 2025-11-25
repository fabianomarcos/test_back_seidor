import { VehicleAllocationInMemoryRepository } from '@/core/vehicle-allocation/infra/db/in-memory/vehicle-allocation-in-memory.repository'
import { CreateVehicleAllocationUseCase } from './create-vehicle-allocation.use-case'

describe('CreateVehicleAllocationUseCase unit tests', () => {
  let usecase: CreateVehicleAllocationUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeEach(() => {
    repository = new VehicleAllocationInMemoryRepository()
    usecase = new CreateVehicleAllocationUseCase(repository)
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

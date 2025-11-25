import { VehicleAllocationInMemoryRepository } from '@/core/vehicle-allocation/infra/db/in-memory/vehicle-allocation-in-memory.repository'
import { DeleteVehicleAllocationUseCase } from './delete-vehicle-allocation.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteVehicleAllocationUseCase Unit Tests', () => {
  let useCase: DeleteVehicleAllocationUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeEach(() => {
    repository = new VehicleAllocationInMemoryRepository()
    useCase = new DeleteVehicleAllocationUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    )

    const vehicleId = new VehicleAllocationId()

    await expect(() =>
      useCase.execute({ id: vehicleId.value }),
    ).rejects.toThrow(new NotFoundError(vehicleId.value, VehicleAllocation))
  })

  /* it('should delete a category', async () => {
    const items = [
      new VehicleAllocation({
        brand: 'test 1',
        color: 'azul',
        plate: 'aaa-1234',
      }),
    ] as VehicleAllocation[]
    repository.items = items
    await useCase.execute({
      id: items[0]!.vehicle_id.value,
    })
    expect(repository.items).toHaveLength(0)
  }) */
})

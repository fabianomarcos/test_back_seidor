import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { DeleteVehicleUseCase } from './delete-vehicle.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import { Vehicle, VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteVehicleUseCase Unit Tests', () => {
  let useCase: DeleteVehicleUseCase
  let repository: VehicleInMemoryRepository

  beforeEach(() => {
    repository = new VehicleInMemoryRepository()
    useCase = new DeleteVehicleUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    )

    const vehicleId = new VehicleId()

    await expect(() =>
      useCase.execute({ id: vehicleId.value }),
    ).rejects.toThrow(new NotFoundError(vehicleId.value, Vehicle))
  })

  it('should delete a category', async () => {
    const items = [
      new Vehicle({ brand: 'test 1', color: 'azul', plate: 'aaa-1234' }),
    ] as Vehicle[]
    repository.items = items
    await useCase.execute({
      id: items[0]!.vehicle_id.value,
    })
    expect(repository.items).toHaveLength(0)
  })
})

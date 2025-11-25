import { GetVehicleAllocationByIdUseCase } from './get-vehicle-allocation-by-id.use-case'
import { validUuid } from '@/shared/tests/constants'
import { VehicleAllocation } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { VehicleAllocationInMemoryRepository } from '@/core/vehicle-allocation/infra/db/in-memory/vehicle-allocation-in-memory.repository'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'

/* describe('GetVehicleAllocationUseCase Unit Tests', () => {
  let usecase: GetVehicleAllocationByIdUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeEach(async () => {
    repository = new VehicleAllocationInMemoryRepository()
    usecase = new GetVehicleAllocationByIdUseCase(repository)
  })

  it('should list a vehicle', async () => {
    const items = [
      VehicleAllocation.fake()
        .aVehicleAllocation()
        .withBrand('Corsinha')
        .build(),
    ]
    const [vehicleInDb] = items
    repository.items = items
    const spyFindById = jest.spyOn(repository, 'findById')
    const output = await usecase.execute({ id: vehicleInDb!.vehicle_id!.value })
    expect(spyFindById).toHaveBeenCalledWith(vehicleInDb!.vehicle_id)
    expect(output).toStrictEqual({
      id: vehicleInDb!.vehicle_id.value,
      name: 'Jon Doe',
      created_at: vehicleInDb!.created_at,
      updated_at: vehicleInDb!.updated_at,
    })
  })

  it('should be return an NotFoundError', async () => {
    await expect(() => usecase.execute({ id: validUuid })).rejects.toThrow(
      `VehicleAllocation Not Found using ID ${validUuid}`,
    )

    await expect(() => usecase.execute({ id: 'fake uuid' })).rejects.toThrow(
      new InvalidUuidError(),
    )
  })
}) */

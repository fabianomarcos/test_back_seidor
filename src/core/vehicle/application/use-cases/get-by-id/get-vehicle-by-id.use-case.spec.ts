import { GetVehicleByIdUseCase } from './get-vehicle-by-id.use-case'
import { validUuid } from '@/shared/tests/constants'
import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'
import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'

describe('GetVehicleUseCase Unit Tests', () => {
  let usecase: GetVehicleByIdUseCase
  let repository: VehicleInMemoryRepository

  beforeEach(async () => {
    repository = new VehicleInMemoryRepository()
    usecase = new GetVehicleByIdUseCase(repository)
  })

  it('should list a vehicle', async () => {
    const items = [Vehicle.fake().aVehicle().withBrand('Corsinha').build()]
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
      `Vehicle Not Found using ID ${validUuid}`,
    )

    await expect(() => usecase.execute({ id: 'fake uuid' })).rejects.toThrow(
      new InvalidUuidError(),
    )
  })
})

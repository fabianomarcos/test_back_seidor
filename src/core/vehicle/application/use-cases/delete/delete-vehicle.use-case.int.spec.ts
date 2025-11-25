import { VehiclePrismaRepository } from '@/core/vehicle/infra/db/prisma/vehicle-prisma.repository'
import { DeleteVehicleUseCase } from './delete-vehicle.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { Vehicle, VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteVehicleUseCase Integration Tests', () => {
  let useCase: DeleteVehicleUseCase
  let repository: VehiclePrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new VehiclePrismaRepository(prismaService.prisma)
    useCase = new DeleteVehicleUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const vehicleId = new VehicleId()
    await expect(() =>
      useCase.execute({ id: vehicleId.value }),
    ).rejects.toThrow(new NotFoundError(vehicleId.value, Vehicle))
  })

  it('should delete a vehicle', async () => {
    const vehicle = Vehicle.fake().aVehicle().build()
    await repository.insert(vehicle)
    await useCase.execute({
      id: vehicle.vehicle_id.value,
    })
    const findVehicle = await repository.findById(vehicle.vehicle_id)
    expect(findVehicle).toBeNull()
  })
})

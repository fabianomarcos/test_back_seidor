import { VehicleAllocationPrismaRepository } from '@/core/vehicle-allocation/infra/db/prisma/vehicle-allocation-prisma.repository'
import { DeleteVehicleAllocationUseCase } from './delete-vehicle-allocation.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteVehicleAllocationUseCase Integration Tests', () => {
  let useCase: DeleteVehicleAllocationUseCase
  let repository: VehicleAllocationPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new VehicleAllocationPrismaRepository(prismaService.prisma)
    useCase = new DeleteVehicleAllocationUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const vehicleId = new VehicleAllocationId()
    await expect(() =>
      useCase.execute({ id: vehicleId.value }),
    ).rejects.toThrow(new NotFoundError(vehicleId.value, VehicleAllocation))
  })

  it('should delete a vehicle', async () => {
    const vehicle = VehicleAllocation.fake().aVehicleAllocation().build()
    await repository.insert(vehicle)
    await useCase.execute({
      id: vehicle.vehicle_id.value,
    })
    const findVehicleAllocation = await repository.findById(vehicle.vehicle_id)
    expect(findVehicleAllocation).toBeNull()
  })
})

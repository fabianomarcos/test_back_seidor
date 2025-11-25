import { VehicleAllocationPrismaRepository } from '@/core/vehicle-allocation/infra/db/prisma/vehicle-allocation-prisma.repository'
import { GetVehicleAllocationByIdUseCase } from './get-vehicle-allocation-by-id.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { validUuid } from '@/shared/tests/constants'
import { VehicleAllocation } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'

/* describe('GetVehicleAllocationUseCase Integration Tests', () => {
  let usecase: GetVehicleAllocationByIdUseCase
  let repository: VehicleAllocationPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new VehicleAllocationPrismaRepository(prismaService.prisma)
    usecase = new GetVehicleAllocationByIdUseCase(repository)
  })

  it('should list a vehicle', async () => {
    const data = VehicleAllocation.fake()
      .aVehicleAllocation()
      .withColor('Jon Doe')
      .build()
    await repository.insert(data)
    const output = await usecase.execute({ id: data.vehicle_id.value })
    expect(output).toStrictEqual({
      id: data.vehicle_id.value,
      color: 'Jon Doe',
      brand: data.brand,
      plate: data.plate,
      created_at: data.created_at,
      updated_at: data.updated_at,
    })
  })

  it('should be return an NotFoundError', async () => {
    await expect(() => usecase.execute({ id: validUuid })).rejects.toThrow(
      `VehicleAllocation Not Found using ID ${validUuid}`,
    )
  })
}) */

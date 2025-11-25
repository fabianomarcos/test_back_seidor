import { VehiclePrismaRepository } from '@/core/vehicle/infra/db/prisma/vehicle-prisma.repository'
import { GetVehicleByIdUseCase } from './get-vehicle-by-id.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { validUuid } from '@/shared/tests/constants'
import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'

describe('GetVehicleUseCase Integration Tests', () => {
  let usecase: GetVehicleByIdUseCase
  let repository: VehiclePrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new VehiclePrismaRepository(prismaService.prisma)
    usecase = new GetVehicleByIdUseCase(repository)
  })

  it('should list a vehicle', async () => {
    const data = Vehicle.fake().aVehicle().withColor('Jon Doe').build()
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
      `Vehicle Not Found using ID ${validUuid}`,
    )
  })
})

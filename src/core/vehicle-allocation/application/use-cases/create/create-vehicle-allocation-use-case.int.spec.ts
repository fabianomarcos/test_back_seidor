import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { CreateVehicleAllocationUseCase } from './create-vehicle-allocation.use-case'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '../../../domain/vehicle-allocation.aggregate'
import { VehicleAllocationPrismaRepository } from '@/core/vehicle-allocation/infra/db/prisma/vehicle-allocation-prisma.repository'
import { validUuid, validUuid_2 } from '@/shared/tests/constants'

describe('CreateVehicleAllocationUseCase Integration Tests', () => {
  let usecase: CreateVehicleAllocationUseCase
  let repository: VehicleAllocationPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new VehicleAllocationPrismaRepository(prismaService.prisma)
    usecase = new CreateVehicleAllocationUseCase(repository)
  })

  it('should create a vehicle', async () => {
    const data: any = VehicleAllocation.fake().aVehicleAllocation().build()
    await repository.insert(data)
    const output = await usecase.execute(data)

    const entity = await repository.findById(new VehicleAllocationId(output.id))

    expect(output).toStrictEqual({
      id: entity?.vehicle_id.value,
      ...entity,
    })
  })

  it('should be return a Entity validation error', async () => {
    await expect(() =>
      usecase.execute({
        driver_id: validUuid,
        reason: 'd'.repeat(256),
        vehicle_id: validUuid_2,
        start_date: new Date(),
      }),
    ).rejects.toThrow('Entity Validation Error')
    await expect(() => usecase.execute({ name: null } as any)).rejects.toThrow(
      'Entity Validation Error',
    )
    await expect(() =>
      usecase.execute({
        brand: undefined,
        color: 'd'.repeat(255),
        plate: 'hhh-1111',
      } as any),
    ).rejects.toThrow('Entity Validation Error')
  })
})

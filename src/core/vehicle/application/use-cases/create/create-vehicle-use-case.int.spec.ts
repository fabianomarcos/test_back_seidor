import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { CreateVehicleUseCase } from './create-vehicle.use-case'
import { VehicleId } from '../../../domain/vehicle.aggregate'
import { VehiclePrismaRepository } from '@/core/vehicle/infra/db/prisma/vehicle-prisma.repository'

describe('CreateVehicleUseCase Integration Tests', () => {
  let usecase: CreateVehicleUseCase
  let repository: VehiclePrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new VehiclePrismaRepository(prismaService.prisma)
    usecase = new CreateVehicleUseCase(repository)
  })

  it('should create a vehicle', async () => {
    const output = await usecase.execute({
      brand: 'Palio',
      color: 'branco',
      plate: 'hhh-1111',
    })

    const entity = await repository.findById(new VehicleId(output.id))

    expect(output).toStrictEqual({
      id: entity?.vehicle_id.value,
      brand: 'Palio',
      color: 'branco',
      plate: 'hhh-1111',
      created_at: output.created_at,
      updated_at: output.updated_at,
    })
  })

  it('should be return a Entity validation error', async () => {
    await expect(() =>
      usecase.execute({
        brand: 'Palio',
        color: 'd'.repeat(256),
        plate: 'hhh-1111',
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
    await expect(() =>
      usecase.execute({
        brand: 'd'.repeat(255),
        color: undefined,
        plate: 'hhh-1111',
      } as any),
    ).rejects.toThrow('Entity Validation Error')
    await expect(() =>
      usecase.execute({ brand: 'a', color: 'a', plate: 'hhh-1111' }),
    ).rejects.toThrow('Entity Validation Error')
  })
})

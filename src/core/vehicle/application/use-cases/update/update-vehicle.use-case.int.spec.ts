import { VehiclePrismaRepository } from '@/core/vehicle/infra/db/prisma/vehicle-prisma.repository'
import { UpdateVehicleUseCase } from './update-vehicle.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { Vehicle, VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('UpdateVehicleUseCase Integration Tests', () => {
  let useCase: UpdateVehicleUseCase
  let repository: VehiclePrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new VehiclePrismaRepository(prismaService.prisma)
    useCase = new UpdateVehicleUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const categoryId = new VehicleId()
    await expect(() =>
      useCase.execute({
        id: categoryId.value,
        brand: 'fake',
        plate: 'fakefake',
        color: 'fake',
      }),
    ).rejects.toThrow(new NotFoundError(categoryId.value, Vehicle))
  })

  it('should update a category', async () => {
    const entity = Vehicle.fake().aVehicle().build()
    repository.insert(entity)

    let output = await useCase.execute({
      id: entity.vehicle_id.value,
      brand: 'fake',
      plate: 'fakefake',
      color: 'fake',
    })
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      brand: 'fake',
      plate: 'fakefake',
      color: 'fake',
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    type Arrange = {
      input: {
        id: string
        brand: string
        plate: string
        color: string
      }
      expected: {
        id: string
        brand: string
        plate: string
        color: string
        created_at: Date
        updated_at: Date
      }
    }
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.vehicle_id.value,
          brand: 'fake',
          plate: 'fakefake',
          color: 'fake',
        },
        expected: {
          id: entity.vehicle_id.value,
          brand: 'fake',
          plate: 'fakefake',
          color: 'fake',
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ]

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        color: i.input.color,
        plate: i.input.plate,
        brand: i.input.brand,
      })
      const entityUpdated = await repository.findById(new VehicleId(i.input.id))
      expect(output).toStrictEqual({
        id: entity.vehicle_id.value,
        color: i.expected.color,
        plate: i.expected.plate,
        brand: i.expected.brand,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
      expect(entityUpdated!.toJSON()).toStrictEqual({
        vehicle_id: entity.vehicle_id.value,
        color: i.expected.color,
        plate: i.expected.plate,
        brand: i.expected.brand,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
    }
  })
})

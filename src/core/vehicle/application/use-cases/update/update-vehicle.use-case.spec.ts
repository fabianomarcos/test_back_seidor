import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { UpdateVehicleUseCase } from './update-vehicle.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import { Vehicle, VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('UpdateVehicleUseCase Unit Tests', () => {
  let useCase: UpdateVehicleUseCase
  let repository: VehicleInMemoryRepository

  beforeEach(() => {
    repository = new VehicleInMemoryRepository()
    useCase = new UpdateVehicleUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() =>
      useCase.execute({
        id: 'fake id',
        brand: 'fake',
        plate: 'fake',
        color: 'fake',
      }),
    ).rejects.toThrow(new InvalidUuidError())

    const vehicleId = new VehicleId()

    await expect(() =>
      useCase.execute({
        id: vehicleId.value,
        brand: 'fake',
        plate: 'fake',
        color: 'fake',
      }),
    ).rejects.toThrow(new NotFoundError(vehicleId.value, Vehicle))
  })

  it('should throw an error when aggregate is not valid', async () => {
    const aggregate = new Vehicle({
      brand: 'fake',
      plate: 'fakefake',
      color: 'fake',
    })
    repository.items = [aggregate]
    await expect(() =>
      useCase.execute({
        id: aggregate.vehicle_id.value,
        brand: 't'.repeat(256),
        color: 'fake',
        plate: 'fakefake',
      }),
    ).rejects.toThrow('Entity Validation Error')
  })

  it('should update a vehicle', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const entity = new Vehicle({
      brand: 'fake',
      plate: 'fakefake',
      color: 'fake',
    })
    repository.items = [entity]

    let output = await useCase.execute({
      id: entity.vehicle_id.value,
      brand: 'fake',
      plate: 'fakefake',
      color: 'fake',
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      name: 'fake',
      plate: 'fakefake',
      color: 'fake',
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    type Arrange = {
      input: {
        id: string
        brand: string
        color: string
        plate: string
      }
      expected: {
        id: string
        brand: string
        color: string
        plate: string
        created_at: Date
        updated_at: Date
      }
    }
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.vehicle_id.value,
          brand: 'brand',
          color: 'brand',
          plate: 'fakefake',
        },
        expected: {
          id: entity.vehicle_id.value,
          brand: 'brand',
          color: 'brand',
          plate: 'fakefake',
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ]

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        brand: i.input.brand,
        color: i.input.color,
        plate: i.input.plate,
      })
      expect(output).toStrictEqual({
        id: entity.vehicle_id.value,
        color: i.expected.color,
        brand: i.expected.brand,
        plate: i.expected.plate,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      })
    }
  })
})

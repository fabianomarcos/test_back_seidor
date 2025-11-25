import { DriverInMemoryRepository } from '@/core/driver/infra/db/in-memory/driver-in-memory.repository'
import { UpdateDriverUseCase } from './update-driver.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import { Driver, DriverId } from '@/core/driver/domain/driver.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('UpdateDriverUseCase Unit Tests', () => {
  let useCase: UpdateDriverUseCase
  let repository: DriverInMemoryRepository

  beforeEach(() => {
    repository = new DriverInMemoryRepository()
    useCase = new UpdateDriverUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() =>
      useCase.execute({ id: 'fake id', name: 'fake' }),
    ).rejects.toThrow(new InvalidUuidError())

    const driverId = new DriverId()

    await expect(() =>
      useCase.execute({ id: driverId.value, name: 'fake' }),
    ).rejects.toThrow(new NotFoundError(driverId.value, Driver))
  })

  it('should throw an error when aggregate is not valid', async () => {
    const aggregate = new Driver({ name: 'Movie' })
    repository.items = [aggregate]
    await expect(() =>
      useCase.execute({
        id: aggregate.driver_id.value,
        name: 't'.repeat(256),
      }),
    ).rejects.toThrow('Entity Validation Error')
  })

  it('should update a driver', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const entity = new Driver({ name: 'Movie' })
    repository.items = [entity]

    let output = await useCase.execute({
      id: entity.driver_id.value,
      name: 'test',
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.driver_id.value,
      name: 'test',
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    type Arrange = {
      input: {
        id: string
        name: string
      }
      expected: {
        id: string
        name: string
        created_at: Date
        updated_at: Date
      }
    }
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.driver_id.value,
          name: 'test',
        },
        expected: {
          id: entity.driver_id.value,
          name: 'test',
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ]

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
      })
      expect(output).toStrictEqual({
        id: entity.driver_id.value,
        name: i.expected.name,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      })
    }
  })
})

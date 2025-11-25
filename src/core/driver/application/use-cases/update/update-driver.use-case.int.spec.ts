import { DriverPrismaRepository } from '@/core/driver/infra/db/prisma/driver-prisma.repository'
import { UpdateDriverUseCase } from './update-driver.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { Driver, DriverId } from '@/core/driver/domain/driver.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('UpdateDriverUseCase Integration Tests', () => {
  let useCase: UpdateDriverUseCase
  let repository: DriverPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new DriverPrismaRepository(prismaService.prisma)
    useCase = new UpdateDriverUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const categoryId = new DriverId()
    await expect(() =>
      useCase.execute({ id: categoryId.value, name: 'fake' }),
    ).rejects.toThrow(new NotFoundError(categoryId.value, Driver))
  })

  it('should update a category', async () => {
    const entity = Driver.fake().aDriver().build()
    repository.insert(entity)

    let output = await useCase.execute({
      id: entity.driver_id.value,
      name: 'test',
    })
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
      const entityUpdated = await repository.findById(new DriverId(i.input.id))
      expect(output).toStrictEqual({
        id: entity.driver_id.value,
        name: i.expected.name,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
      expect(entityUpdated!.toJSON()).toStrictEqual({
        driver_id: entity.driver_id.value,
        name: i.expected.name,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
    }
  })
})

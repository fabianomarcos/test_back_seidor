import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { DriverPrismaRepository } from '../../infra/db/prisma/driver-prisma.repository'
import { CreateDriverUseCase } from './create-driver.use-case'
import { DriverId } from '../../domain/driver.aggregate'

describe('CreateDriverUseCase Integration Tests', () => {
  let usecase: CreateDriverUseCase
  let repository: DriverPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new DriverPrismaRepository(prismaService.prisma)
    usecase = new CreateDriverUseCase(repository)
  })

  it('should create a driver', async () => {
    const output = await usecase.execute({ name: 'Maria' })
    const entity = await repository.findById(new DriverId(output.id))

    expect(output).toStrictEqual({
      id: entity?.driver_id.value,
      name: 'Maria',
      created_at: output.created_at,
      updated_at: output.updated_at,
    })
  })

  it('should be return a Entity validation error', async () => {
    await expect(() =>
      usecase.execute({ name: 'd'.repeat(256) }),
    ).rejects.toThrow('Entity Validation Error')
    await expect(() => usecase.execute({ name: null } as any)).rejects.toThrow(
      'Entity Validation Error',
    )
    await expect(() =>
      usecase.execute({ name: undefined } as any),
    ).rejects.toThrow('Entity Validation Error')
    await expect(() => usecase.execute({ name: '' })).rejects.toThrow(
      'Entity Validation Error',
    )
    await expect(() => usecase.execute({ name: 'a' })).rejects.toThrow(
      'Entity Validation Error',
    )
  })
})

import { DriverPrismaRepository } from '@/core/driver/infra/db/prisma/driver-prisma.repository'
import { GetDriverByIdUseCase } from './get-driver-by-id.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { validUuid } from '@/shared/tests/constants'
import { Driver } from '@/core/driver/domain/driver.aggregate'

describe('GetDriverUseCase Integration Tests', () => {
  let usecase: GetDriverByIdUseCase
  let repository: DriverPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(async () => {
    repository = new DriverPrismaRepository(prismaService.prisma)
    usecase = new GetDriverByIdUseCase(repository)
  })

  it('should list a driver', async () => {
    const data = Driver.fake().aDriver().withName('Jon Doe').build()
    await repository.insert(data)
    const output = await usecase.execute({ id: data.driver_id.value })
    expect(output).toStrictEqual({
      id: data.driver_id.value,
      name: 'Jon Doe',
      created_at: output.created_at,
      updated_at: output.updated_at,
    })
  })

  it('should be return an NotFoundError', async () => {
    await expect(() => usecase.execute({ id: validUuid })).rejects.toThrow(
      `Driver Not Found using ID ${validUuid}`,
    )
  })
})

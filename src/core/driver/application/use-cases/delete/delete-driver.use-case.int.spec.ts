import { DriverPrismaRepository } from '@/core/driver/infra/db/prisma/driver-prisma.repository'
import { DeleteDriverUseCase } from './delete-driver.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import { Driver, DriverId } from '@/core/driver/domain/driver.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteDriverUseCase Integration Tests', () => {
  let useCase: DeleteDriverUseCase
  let repository: DriverPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new DriverPrismaRepository(prismaService.prisma)
    useCase = new DeleteDriverUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const driverId = new DriverId()
    await expect(() => useCase.execute({ id: driverId.value })).rejects.toThrow(
      new NotFoundError(driverId.value, Driver),
    )
  })

  it('should delete a driver', async () => {
    const driver = Driver.fake().aDriver().build()
    await repository.insert(driver)
    await useCase.execute({
      id: driver.driver_id.value,
    })
    const findDriver = await repository.findById(driver.driver_id)
    expect(findDriver).toBeNull()
  })
})

import { DriverInMemoryRepository } from '@/core/driver/infra/db/in-memory/driver-in-memory.repository'
import { DeleteDriverUseCase } from './delete-driver.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import { Driver, DriverId } from '@/core/driver/domain/driver.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'

describe('DeleteDriverUseCase Unit Tests', () => {
  let useCase: DeleteDriverUseCase
  let repository: DriverInMemoryRepository

  beforeEach(() => {
    repository = new DriverInMemoryRepository()
    useCase = new DeleteDriverUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    )

    const driverId = new DriverId()

    await expect(() => useCase.execute({ id: driverId.value })).rejects.toThrow(
      new NotFoundError(driverId.value, Driver),
    )
  })

  it('should delete a category', async () => {
    const items = [new Driver({ name: 'test 1' })] as Driver[]
    repository.items = items
    await useCase.execute({
      id: items[0]!.driver_id.value,
    })
    expect(repository.items).toHaveLength(0)
  })
})

import { GetDriverByIdUseCase } from './get-driver-by-id.use-case'
import { validUuid } from '@/shared/tests/constants'
import { Driver } from '@/core/driver/domain/driver.aggregate'
import { DriverInMemoryRepository } from '@/core/driver/infra/db/in-memory/driver-in-memory.repository'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'

describe('GetDriverUseCase Unit Tests', () => {
  let usecase: GetDriverByIdUseCase
  let repository: DriverInMemoryRepository

  beforeEach(async () => {
    repository = new DriverInMemoryRepository()
    usecase = new GetDriverByIdUseCase(repository)
  })

  it('should list a driver', async () => {
    const items = [Driver.create({ name: 'Jon Doe' })]
    const [driverInDb] = items
    repository.items = items
    const spyFindById = jest.spyOn(repository, 'findById')
    const output = await usecase.execute({ id: driverInDb!.driver_id!.value })
    expect(spyFindById).toHaveBeenCalledWith(driverInDb!.driver_id)
    expect(output).toStrictEqual({
      id: driverInDb!.driver_id.value,
      name: 'Jon Doe',
      created_at: driverInDb!.created_at,
      updated_at: driverInDb!.updated_at,
    })
  })

  it('should be return an NotFoundError', async () => {
    await expect(() => usecase.execute({ id: validUuid })).rejects.toThrow(
      `Driver Not Found using ID ${validUuid}`,
    )

    await expect(() => usecase.execute({ id: 'fake uuid' })).rejects.toThrow(
      new InvalidUuidError(),
    )
  })
})

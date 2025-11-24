import { DriverInMemoryRepository } from '../../infra/db/in-memory/driver-in-memory.repository'
import { CreateDriverUseCase } from './create-driver.use-case'

describe('CreateDriverUseCase unit tests', () => {
  let usecase: CreateDriverUseCase
  let repository: DriverInMemoryRepository

  beforeEach(() => {
    repository = new DriverInMemoryRepository()
    usecase = new CreateDriverUseCase(repository)
  })

  it('should throw an error when aggregate is not valid', async () => {
    const input = { name: 'F'.repeat(256) }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      'Entity Validation Error',
    )
  })
})

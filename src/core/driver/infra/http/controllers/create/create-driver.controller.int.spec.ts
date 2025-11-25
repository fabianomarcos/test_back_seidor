import { CreateDriverUseCase } from '@/core/driver/application/use-cases/create/create-driver.use-case'
import { CreateDriverController } from './create-driver.controller'
import { DriverInMemoryRepository } from '../../../db/in-memory/driver-in-memory.repository'
import httpMocks from 'node-mocks-http'

describe('Create Driver Controller integration tests', () => {
  let controller: CreateDriverController
  let usecase: CreateDriverUseCase
  let repository: DriverInMemoryRepository

  beforeAll(() => {
    repository = new DriverInMemoryRepository()
    usecase = new CreateDriverUseCase(repository)
    controller = new CreateDriverController(usecase)
  })

  it('should create a driver', async () => {
    const req = httpMocks.createRequest({
      body: { name: 'Fabiano' },
      method: 'POST',
    })
    const res = jest.fn() as any
    const next = jest.fn() as any
    await controller.create(req, res, next)
    expect(repository.items.length).toBe(1)
    expect(repository!.items[0]!.name).toBe('Fabiano')
    expect(repository!.items[0]!.driver_id.value).toBeDefined()
  })
})

import { CreateVehicleUseCase } from '@/core/vehicle/application/use-cases/create/create-vehicle.use-case'
import { CreateVehicleController } from './create-vehicle.controller'
import { VehicleInMemoryRepository } from '../../../db/in-memory/vehicle-in-memory.repository'
import httpMocks from 'node-mocks-http'

describe('Create Vehicle Controller integration tests', () => {
  let controller: CreateVehicleController
  let usecase: CreateVehicleUseCase
  let repository: VehicleInMemoryRepository

  beforeAll(() => {
    repository = new VehicleInMemoryRepository()
    usecase = new CreateVehicleUseCase(repository)
    controller = new CreateVehicleController(usecase)
  })

  it('should create a vehicle', async () => {
    const req = httpMocks.createRequest({
      body: { brand: 'Fake', color: 'fake', plate: 'fakefake' },
      method: 'POST',
    })
    const res = jest.fn() as any
    const next = jest.fn() as any
    await controller.create(req, res, next)
    expect(repository.items.length).toBe(1)
    expect(repository!.items[0]!.brand).toBe('Fake')
    expect(repository!.items[0]!.vehicle_id.value).toBeDefined()
  })
})

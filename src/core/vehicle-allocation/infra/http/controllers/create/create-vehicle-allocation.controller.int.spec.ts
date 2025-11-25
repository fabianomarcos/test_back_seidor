import { CreateVehicleAllocationUseCase } from '@/core/vehicle-allocation/application/use-cases/create/create-vehicle-allocation.use-case'
import { CreateVehicleAllocationController } from './create-vehicle-allocation.controller'
import { VehicleAllocationInMemoryRepository } from '../../../db/in-memory/vehicle-allocation-in-memory.repository'
import httpMocks from 'node-mocks-http'
import { VehicleAllocation } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'

describe('Create VehicleAllocation Controller integration tests', () => {
  let controller: CreateVehicleAllocationController
  let usecase: CreateVehicleAllocationUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeAll(() => {
    repository = new VehicleAllocationInMemoryRepository()
    usecase = new CreateVehicleAllocationUseCase(repository)
    controller = new CreateVehicleAllocationController(usecase)
  })

  it('should create a vehicle', async () => {
    const body = VehicleAllocation.fake().aVehicleAllocation().build()
    const req = httpMocks.createRequest({
      body,
      method: 'POST',
    })
    const res = jest.fn() as any
    const next = jest.fn() as any
    await controller.create(req, res, next)
    expect(repository.items.length).toBe(1)
    expect(repository!.items[0]!.allocation_id.value).toBeDefined()
    expect(repository!.items[0]).toStrictEqual(body)
  })
})

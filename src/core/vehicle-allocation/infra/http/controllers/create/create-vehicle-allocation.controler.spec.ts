import { CreateVehicleAllocationController } from './create-vehicle-allocation.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleAllocationOutput } from '@/core/vehicle-allocation/application/use-cases/create/create-vehicle-allocation.use-case'
import { VehicleAllocation } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'

describe('GetByIdVehicleAllocationController', () => {
  let controller: CreateVehicleAllocationController
  let usecase: jest.Mocked<IUseCase<any, CreateVehicleAllocationOutput>>
  let request: any
  let response: any
  let next: any

  const body: VehicleAllocation = VehicleAllocation.fake()
    .aVehicleAllocation()
    .build()

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(body)),
    }

    controller = new CreateVehicleAllocationController(usecase)

    request = { body }

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    next = jest.fn()
  })

  it('should call usecase with request.body', async () => {
    await controller.create(request, response, next)
    expect(usecase.execute).toHaveBeenCalledWith(request.body)
  })

  it('should return 201', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(body) as any)
    await controller.create(request, response, next)
    expect(response.status).toHaveBeenCalledWith(201)
  })

  it('should call next(error) is usecase throws', async () => {
    const error = new Error('Error')
    usecase.execute.mockRejectedValueOnce(error)
    await controller.create(request, response, next)
    expect(next).toHaveBeenCalledWith(error)
    expect(response.status).not.toHaveBeenCalled()
  })

  it('should instantiate VehicleAllocationPresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(body) as any)
    const presenterSpy = jest.spyOn(
      require('../../presenters/driver.presenter'),
      'VehicleAllocationPresenter',
    )

    await controller.create(request, response, next)
    expect(presenterSpy).toHaveBeenCalledWith(body)
  })

  it('should accept empty body and forward to usecase', async () => {
    request.body = {}
    await controller.create(request, response, next)
    expect(usecase.execute).toHaveBeenCalledWith({})
  })
})

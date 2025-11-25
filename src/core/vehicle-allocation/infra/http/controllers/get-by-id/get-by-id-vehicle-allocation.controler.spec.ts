import { validUuid, validUuid_2, validUuid_3 } from '@/shared/tests/constants'
import { GetByIdVehicleAllocationController } from './get-by-id-vehicle-allocation.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import {
  GetVehicleAllocationInput,
  GetVehicleAllocationOutput,
} from '@/core/vehicle-allocation/application/use-cases/get-by-id/get-vehicle-allocation-by-id.use-case'

describe('CreateVehicleAllocationController', () => {
  let controller: GetByIdVehicleAllocationController
  let usecase: jest.Mocked<
    IUseCase<GetVehicleAllocationInput, GetVehicleAllocationOutput>
  >
  let request: any
  let response: any
  let next: any

  const output: GetVehicleAllocationOutput = {
    id: validUuid,
    reason: 'Fake',
    driver_id: validUuid_2,
    vehicle_id: validUuid_3,
    start_date: new Date(),
    end_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    controller = new GetByIdVehicleAllocationController(usecase)

    request = { params: { id: validUuid } }

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    next = jest.fn()
  })

  it('should call usecase with request.body', async () => {
    await controller.find(request, response, next)
    expect(usecase.execute).toHaveBeenCalledWith(request.params)
  })

  it('should return 200', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    await controller.find(request, response, next)
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should call next(error) is usecase throws', async () => {
    const error = new Error('Error')
    usecase.execute.mockRejectedValueOnce(error)
    await controller.find(request, response, next)
    expect(next).toHaveBeenCalledWith(error)
    expect(response.status).not.toHaveBeenCalled()
  })

  it('should instantiate VehicleAllocationPresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    const presenterSpy = jest.spyOn(
      require('../../presenters/vehicle.presenter'),
      'VehicleAllocationPresenter',
    )

    await controller.find(request, response, next)
    expect(presenterSpy).toHaveBeenCalledWith(output)
  })

  it('should accept empty body and forward to usecase', async () => {
    request.params = { id: validUuid }
    await controller.find(request, response, next)
    expect(usecase.execute).toHaveBeenCalledWith({ id: validUuid })
  })
})

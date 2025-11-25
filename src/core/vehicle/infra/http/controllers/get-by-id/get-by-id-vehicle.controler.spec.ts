import { validUuid } from '@/shared/tests/constants'
import { GetByIdVehicleController } from './get-by-id-vehicle.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import {
  GetVehicleInput,
  GetVehicleOutput,
} from '@/core/vehicle/application/use-cases/get-by-id/get-vehicle-by-id.use-case'

describe('CreateVehicleController', () => {
  let controller: GetByIdVehicleController
  let usecase: jest.Mocked<IUseCase<GetVehicleInput, GetVehicleOutput>>
  let request: any
  let response: any
  let next: any

  const output: GetVehicleOutput = {
    id: validUuid,
    brand: 'Fake',
    plate: 'FakeFake',
    color: 'Fake',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    controller = new GetByIdVehicleController(usecase)

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

  it('should instantiate VehiclePresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    const presenterSpy = jest.spyOn(
      require('../../presenters/vehicle.presenter'),
      'VehiclePresenter',
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

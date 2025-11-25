import { validUuid } from '@/shared/tests/constants'
import { CreateVehicleController } from './create-vehicle.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleOutput } from '@/core/vehicle/application/use-cases/create/create-vehicle.use-case'

describe('GetByIdVehicleController', () => {
  let controller: CreateVehicleController
  let usecase: jest.Mocked<IUseCase<any, CreateVehicleOutput>>
  let request: any
  let response: any
  let next: any

  const output: CreateVehicleOutput = {
    id: validUuid,
    brand: 'Fake',
    color: 'fake',
    plate: 'fakefake',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    controller = new CreateVehicleController(usecase)

    request = { body: { brand: 'Fake', color: 'fake', plate: 'fakefake' } }

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
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
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

  it('should instantiate VehiclePresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    const presenterSpy = jest.spyOn(
      require('../../presenters/driver.presenter'),
      'VehiclePresenter',
    )

    await controller.create(request, response, next)
    expect(presenterSpy).toHaveBeenCalledWith(output)
  })

  it('should accept empty body and forward to usecase', async () => {
    request.body = {}
    await controller.create(request, response, next)
    expect(usecase.execute).toHaveBeenCalledWith({})
  })
})

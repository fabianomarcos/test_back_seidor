import { validUuid } from '@/shared/tests/constants'
import { GetByIdDriverController } from './get-by-id-driver.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import {
  GetDriverInput,
  GetDriverOutput,
} from '@/core/driver/application/use-cases/get-by-id/get-driver-by-id.use-case'

describe('CreateDriverController', () => {
  let controller: GetByIdDriverController
  let usecase: jest.Mocked<IUseCase<GetDriverInput, GetDriverOutput>>
  let request: any
  let response: any
  let next: any

  const output: GetDriverOutput = {
    id: validUuid,
    name: 'Fabiano',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    controller = new GetByIdDriverController(usecase)

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

  it('should instantiate DriverPresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    const presenterSpy = jest.spyOn(
      require('../../presenters/driver.presenter'),
      'DriverPresenter',
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

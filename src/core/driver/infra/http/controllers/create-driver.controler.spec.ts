import { CreateDriverOutput } from '@/core/driver/application/use-cases/create/create-driver.use-case'
import { validUuid } from '@/shared/tests/constants'
import { CreateDriverController } from './create-driver.controller'
import { IUseCase } from '@/core/shared/application/use-case.interface'

describe('CreateDriverController', () => {
  let controller: CreateDriverController
  let usecase: jest.Mocked<IUseCase<any, CreateDriverOutput>>
  let request: any
  let response: any
  let next: any

  const output: CreateDriverOutput = {
    id: validUuid,
    name: 'Fabiano',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(() => {
    usecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    controller = new CreateDriverController(usecase)

    request = { body: { name: 'John Doe' } }

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

  it('should instantiate DriverPresente correctly', async () => {
    usecase.execute.mockReturnValueOnce(Promise.resolve(output))
    const presenterSpy = jest.spyOn(
      require('../presenters/driver.presenter'),
      'DriverPresenter',
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

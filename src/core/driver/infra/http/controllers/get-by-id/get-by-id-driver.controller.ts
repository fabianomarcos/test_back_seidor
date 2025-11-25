import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DriverPresenter } from '../../presenters/driver.presenter'
import {
  GetDriverInput,
  GetDriverOutput,
} from '@/core/driver/application/use-cases/get-by-id/get-driver-by-id.use-case'

export class GetByIdDriverController {
  constructor(
    private readonly usecase: IUseCase<GetDriverInput, GetDriverOutput>,
  ) {}

  find = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params as GetDriverInput
      const output = await this.usecase.execute({ id })
      const presenter = new DriverPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

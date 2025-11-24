import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateDriverOutput } from '../../../application/use-cases/create/create-driver.use-case'
import { CreateDriverInput } from '../../../application/use-cases/create/create-driver.input'
import { CreateDriverDto } from '../dtos/create-driver.dto'
import { DriverPresenter } from '../presenters/driver.presenter'

export class CreateDriverController {
  constructor(
    private readonly usecase: IUseCase<CreateDriverInput, CreateDriverOutput>,
  ) {}

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body: CreateDriverDto = request.body
      const output = await this.usecase.execute(body)
      const presenter = new DriverPresenter(output)
      return response.status(201).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

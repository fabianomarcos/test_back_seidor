import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DriverPresenter } from '../../presenters/driver.presenter'
import { GetDriverInput } from '@/core/driver/application/use-cases/get-by-id/get-driver-by-id.use-case'
import { UpdateDriverInput } from '@/core/driver/application/use-cases/update/update-driver.input'
import { UpdateDriverOutput } from '@/core/driver/application/use-cases/update/update-driver.use-case'
import { UpdateDriverDto } from '../../dtos/update-driver.dto'

export class UpdateDriverController {
  constructor(
    private readonly usecase: IUseCase<UpdateDriverInput, UpdateDriverOutput>,
  ) {}

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as GetDriverInput
      const body = request.body as UpdateDriverDto
      const output = await this.usecase.execute({ ...body, id: params.id })
      const presenter = new DriverPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

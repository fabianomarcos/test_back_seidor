import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DeleteDriverInput } from '@/core/driver/application/use-cases/delete/delete-driver.use-case'

export class DeleteDriverController {
  constructor(private readonly usecase: IUseCase<DeleteDriverInput, void>) {}

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as DeleteDriverInput
      await this.usecase.execute({ id: params.id })
      return response.status(204).json()
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

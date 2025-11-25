import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DeleteVehicleInput } from '@/core/vehicle/application/use-cases/delete/delete-vehicle.use-case'

export class DeleteVehicleController {
  constructor(private readonly usecase: IUseCase<DeleteVehicleInput, void>) {}

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as DeleteVehicleInput
      await this.usecase.execute({ id: params.id })
      return response.status(204).json()
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

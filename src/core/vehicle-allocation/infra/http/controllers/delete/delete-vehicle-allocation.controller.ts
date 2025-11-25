import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DeleteVehicleAllocationInput } from '@/core/vehicle-allocation/application/use-cases/delete/delete-vehicle-allocation.use-case'

export class DeleteVehicleAllocationController {
  constructor(
    private readonly usecase: IUseCase<DeleteVehicleAllocationInput, void>,
  ) {}

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as DeleteVehicleAllocationInput
      await this.usecase.execute({ id: params.id })
      return response.status(204).json()
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

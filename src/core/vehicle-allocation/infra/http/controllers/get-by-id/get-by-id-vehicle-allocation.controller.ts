import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehicleAllocationPresenter } from '../../presenters/vehicle-allocation.presenter'
import {
  GetVehicleAllocationInput,
  GetVehicleAllocationOutput,
} from '@/core/vehicle-allocation/application/use-cases/get-by-id/get-vehicle-allocation-by-id.use-case'

export class GetByIdVehicleAllocationController {
  constructor(
    private readonly usecase: IUseCase<
      GetVehicleAllocationInput,
      GetVehicleAllocationOutput
    >,
  ) {}

  find = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params as GetVehicleAllocationInput
      const output = await this.usecase.execute({ id })
      const presenter = new VehicleAllocationPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

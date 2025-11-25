import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehiclePresenter } from '../../presenters/vehicle.presenter'
import {
  GetVehicleInput,
  GetVehicleOutput,
} from '@/core/vehicle/application/use-cases/get-by-id/get-vehicle-by-id.use-case'

export class GetByIdVehicleController {
  constructor(
    private readonly usecase: IUseCase<GetVehicleInput, GetVehicleOutput>,
  ) {}

  find = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params as GetVehicleInput
      const output = await this.usecase.execute({ id })
      const presenter = new VehiclePresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

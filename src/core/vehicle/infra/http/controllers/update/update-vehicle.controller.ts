import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehiclePresenter } from '../../presenters/vehicle.presenter'
import { UpdateVehicleInput } from '@/core/vehicle/application/use-cases/update/update-vehicle.input'
import { UpdateVehicleOutput } from '@/core/vehicle/application/use-cases/update/update-vehicle.use-case'
import { UpdateVehicleDto } from '../../dtos/update-vehicle.dto'

export class UpdateVehicleController {
  constructor(
    private readonly usecase: IUseCase<UpdateVehicleInput, UpdateVehicleOutput>,
  ) {}

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as { id: string }
      const body = request.body as UpdateVehicleDto
      const output = await this.usecase.execute({ ...body, id: params.id })
      const presenter = new VehiclePresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

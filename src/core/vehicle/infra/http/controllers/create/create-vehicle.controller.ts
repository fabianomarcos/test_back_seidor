import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleOutput } from '../../../../application/use-cases/create/create-vehicle.use-case'
import { CreateVehicleInput } from '../../../../application/use-cases/create/create-vehicle.input'
import { CreateVehicleDto } from '../../dtos/create-vehicle.dto'
import { VehiclePresenter } from '../../presenters/vehicle.presenter'
import { UniqueEntityError } from '@/core/shared/domain/errors/unique-entity.error'

export class CreateVehicleController {
  constructor(
    private readonly usecase: IUseCase<CreateVehicleInput, CreateVehicleOutput>,
  ) {}

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body: CreateVehicleDto = request.body
      const output = await this.usecase.execute(body)
      const presenter = new VehiclePresenter(output)
      return response.status(201).json(presenter)
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UniqueEntityError(
          `There is already a license plate with this value saved.`,
        )
      }
      next(error)
    }
  }
}

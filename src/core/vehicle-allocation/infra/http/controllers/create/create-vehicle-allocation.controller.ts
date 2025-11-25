import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleAllocationOutput } from '../../../../application/use-cases/create/create-vehicle-allocation.use-case'
import { CreateVehicleAllocationInput } from '../../../../application/use-cases/create/create-vehicle-allocation.input'
import { CreateVehicleAllocationDto } from '../../dtos/create-vehicle-allocation.dto'
import { VehicleAllocationPresenter } from '../../presenters/vehicle-allocation.presenter'
import { UniqueEntityError } from '@/core/shared/domain/errors/unique-entity.error'

export class CreateVehicleAllocationController {
  constructor(
    private readonly usecase: IUseCase<
      CreateVehicleAllocationInput,
      CreateVehicleAllocationOutput
    >,
  ) {}

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body: CreateVehicleAllocationDto = request.body
      const output = await this.usecase.execute(body)
      const presenter = new VehicleAllocationPresenter(output)
      return response.status(201).json(presenter)
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UniqueEntityError(
          `There is already a allocation with this value saved.`,
        )
      }
      next(error)
    }
  }
}

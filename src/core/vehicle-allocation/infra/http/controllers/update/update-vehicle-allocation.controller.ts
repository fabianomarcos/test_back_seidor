import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehicleAllocationPresenter } from '../../presenters/vehicle-allocation.presenter'
import { UpdateVehicleAllocationInput } from '@/core/vehicle-allocation/application/use-cases/update/update-vehicle-allocation.input'
import { UpdateVehicleAllocationOutput } from '@/core/vehicle-allocation/application/use-cases/update/update-vehicle-allocation.use-case'
import { UpdateVehicleDto } from '../../dtos/update-vehicle-allocation.dto'
import { UniqueEntityError } from '@/core/shared/domain/errors/unique-entity.error'

export class UpdateVehicleController {
  constructor(
    private readonly usecase: IUseCase<
      UpdateVehicleAllocationInput,
      UpdateVehicleAllocationOutput
    >,
  ) {}

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params as { id: string }
      const body = request.body as UpdateVehicleDto
      const output = await this.usecase.execute({
        ...body,
        id: params.id,
      } as any)
      const presenter = new VehicleAllocationPresenter(output)
      return response.status(200).json(presenter)
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UniqueEntityError(
          `There is already a license plate with this value saved.`,
        )
      }
      console.error('error: ', error)
      next(error)
    }
  }
}

import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehicleCollectionPresenter } from '../../presenters/vehicle.presenter'
import { SearchVehiclesDto } from '../../dtos/search-vehicle.dto'
import {
  ListVehiclesInput,
  ListVehiclesOutput,
} from '@/core/vehicle/application/use-cases/list/list-vehicles.use-case'

export class SearchVehicleController {
  constructor(
    private readonly usecase: IUseCase<ListVehiclesInput, ListVehiclesOutput>,
  ) {}

  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const searchParams: SearchVehiclesDto = request.query
      const output = await this.usecase.execute(searchParams)
      const presenter = new VehicleCollectionPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

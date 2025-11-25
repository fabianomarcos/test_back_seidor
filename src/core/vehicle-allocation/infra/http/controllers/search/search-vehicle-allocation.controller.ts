import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehicleAllocationCollectionPresenter } from '../../presenters/vehicle-allocation.presenter'
import { SearchVehiclesAllocationDto } from '../../dtos/search-vehicle-allocation.dto'
import {
  ListVehicleAllocationsInput,
  ListVehicleAllocationsOutput,
} from '@/core/vehicle-allocation/application/use-cases/list/list-vehicle-allocations.use-case'

export class SearchVehicleAllocationController {
  constructor(
    private readonly usecase: IUseCase<
      ListVehicleAllocationsInput,
      ListVehicleAllocationsOutput
    >,
  ) {}

  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const query = request.query

      const filter = {
        ...(query.start_date && { start_date: query.start_date }),
        ...(query.end_date && { end_date: query.end_date }),
      }

      const output = await this.usecase.execute({
        ...query,
        filter,
      } as SearchVehiclesAllocationDto)
      const presenter = new VehicleAllocationCollectionPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

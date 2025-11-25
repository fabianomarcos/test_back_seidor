import { Request, Response, NextFunction } from 'express'

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DriverCollectionPresenter } from '../../presenters/driver.presenter'
import { SearchDriversDto } from '../../dtos/search-driver.dto'
import {
  ListDriversInput,
  ListDriversOutput,
} from '@/core/driver/application/use-cases/list/list-drivers.use-case'

export class SearchDriverController {
  constructor(
    private readonly usecase: IUseCase<ListDriversInput, ListDriversOutput>,
  ) {}

  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const searchParams: SearchDriversDto = request.query
      const output = await this.usecase.execute(searchParams)
      const presenter = new DriverCollectionPresenter(output)
      return response.status(200).json(presenter)
    } catch (error) {
      console.error('error: ', error)
      next(error)
    }
  }
}

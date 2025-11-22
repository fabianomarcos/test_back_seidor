import { ISearchableRepository } from '../../shared/domain/repository/repository-interface'
import { SearchParams } from '../../shared/domain/repository/search-params'
import { SearchResult } from '../../shared/domain/repository/search-result'
import { Driver, DriverId } from './driver.aggregate'

export type DriverFilter = string

export class DriverSearchParams extends SearchParams<DriverFilter> {}

export class DriverSearchResult extends SearchResult<Driver> {}

export interface IDriverRepository
  extends ISearchableRepository<
    Driver,
    DriverId,
    DriverFilter,
    DriverSearchParams,
    DriverSearchResult
  > {}

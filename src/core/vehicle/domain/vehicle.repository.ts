import { ISearchableRepository } from '../../shared/domain/repository/repository-interface'
import { SearchParams } from '../../shared/domain/repository/search-params'
import { SearchResult } from '../../shared/domain/repository/search-result'
import { Vehicle, VehicleId } from './vehicle.aggregate'

export type VehicleFilter = {
  brand?: string
  color?: string
}

export class VehicleSearchParams extends SearchParams<VehicleFilter> {}

export class VehicleSearchResult extends SearchResult<Vehicle> {}

export interface IVehicleRepository
  extends ISearchableRepository<
    Vehicle,
    VehicleId,
    VehicleFilter,
    VehicleSearchParams,
    VehicleSearchResult
  > {}

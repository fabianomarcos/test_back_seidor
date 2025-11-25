import { ISearchableRepository } from '../../shared/domain/repository/repository-interface'
import {
  SearchParams,
  SearchParamsConstructorProps,
} from '../../shared/domain/repository/search-params'
import { SearchResult } from '../../shared/domain/repository/search-result'
import { Vehicle, VehicleId } from './vehicle.aggregate'

export type VehicleFilter = {
  brand?: string
  color?: string
  plate?: string
}

export class VehicleSearchParams extends SearchParams<VehicleFilter> {
  private constructor(props: SearchParamsConstructorProps<VehicleFilter> = {}) {
    super(props)
  }

  static create(
    props: Omit<SearchParamsConstructorProps<VehicleFilter>, 'filter'> & {
      filter?:
        | {
            color?: string
            brand?: string
            plate?: string
          }
        | undefined
    } = {},
  ) {
    return new VehicleSearchParams({
      ...props,
      filter: {
        color: props.filter?.color,
        plate: props.filter?.plate,
        brand: props.filter?.brand,
      } as VehicleFilter,
    })
  }

  get filter(): VehicleFilter | null {
    return this._filter
  }

  protected set filter(value: VehicleFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value

    const filter = {
      ...(_value?.color && { color: `${_value.color}` }),
      ...(_value?.plate && { plate: `${_value.plate}` }),
      ...(_value?.brand && { brand: `${_value.brand}` }),
    }

    this._filter = Object.keys(filter).length === 0 ? null : filter
  }
}

export class VehicleSearchResult extends SearchResult<Vehicle> {}

export interface IVehicleRepository
  extends ISearchableRepository<
    Vehicle,
    VehicleId,
    VehicleFilter,
    VehicleSearchParams,
    VehicleSearchResult
  > {}

import { ISearchableRepository } from '../../shared/domain/repository/repository-interface'
import {
  SearchParams,
  SearchParamsConstructorProps,
} from '../../shared/domain/repository/search-params'
import { SearchResult } from '../../shared/domain/repository/search-result'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from './vehicle-allocation.aggregate'

export type VehicleAllocationFilter = {
  start_date?: Date
  end_date?: Date
  driver_id?: string
  vehicle_id?: string
} | null

export class VehicleAllocationSearchParams extends SearchParams<VehicleAllocationFilter> {
  private constructor(
    props: SearchParamsConstructorProps<VehicleAllocationFilter> = {},
  ) {
    super(props)
  }

  static create(
    props: Omit<
      SearchParamsConstructorProps<VehicleAllocationFilter>,
      'filter'
    > & {
      filter?:
        | {
            start_date?: Date
            end_date?: Date
          }
        | undefined
    } = {},
  ) {
    return new VehicleAllocationSearchParams({
      ...props,
      filter: {
        start_date: props.filter?.start_date,
        end_date: props.filter?.end_date,
      } as VehicleAllocationFilter,
    })
  }

  get filter(): VehicleAllocationFilter | null {
    return this._filter
  }

  protected set filter(value: VehicleAllocationFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value

    const filter = {
      ...(_value?.end_date && { end_date: value?.end_date }),
      ...(_value?.start_date && { start_date: value!.start_date }),
    }

    this._filter =
      Object.keys(filter).length === 0
        ? null
        : (filter as VehicleAllocationFilter)
  }
}

export class VehicleAllocationSearchResult extends SearchResult<VehicleAllocation> {}

export interface IVehicleAllocationRepository
  extends ISearchableRepository<
    VehicleAllocation,
    VehicleAllocationId,
    VehicleAllocationFilter,
    VehicleAllocationSearchParams,
    VehicleAllocationSearchResult
  > {}

import {
  VehicleAllocationFilter,
  VehicleAllocationSearchParams,
  VehicleAllocationSearchResult,
  IVehicleAllocationRepository,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.repository'
import {
  IUseCase,
  ListInputBase,
} from '@/core/shared/application/use-case.interface'
import {
  VehicleAllocationOutput,
  VehicleAllocationOutputMapper,
} from '../common/vehicle-allocation.output'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/core/shared/application/pagination-output'
import { SearchParamsConstructorProps } from '@/core/shared/domain/repository/search-params'

export class ListVehicleAllocationsUseCase
  implements
    IUseCase<ListVehicleAllocationsInput, ListVehicleAllocationsOutput>
{
  constructor(private repository: IVehicleAllocationRepository) {}

  async execute(
    input: ListVehicleAllocationsInput,
  ): Promise<ListVehicleAllocationsOutput> {
    const params = VehicleAllocationSearchParams.create(
      input as Omit<
        SearchParamsConstructorProps<VehicleAllocationFilter>,
        'filter'
      >,
    )
    const searchResult = await this.repository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(
    searchResult: VehicleAllocationSearchResult,
  ): ListVehicleAllocationsOutput {
    const { items: _items } = searchResult
    const items = _items.map((item) =>
      VehicleAllocationOutputMapper.toOutput(item),
    )
    return PaginationOutputMapper.toOutput(items, searchResult)
  }
}

export type ListVehicleAllocationsInput = ListInputBase<VehicleAllocationFilter>

export type ListVehicleAllocationsOutput =
  PaginationOutput<VehicleAllocationOutput>

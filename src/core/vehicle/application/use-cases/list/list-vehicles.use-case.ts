import {
  VehicleFilter,
  VehicleSearchParams,
  VehicleSearchResult,
  IVehicleRepository,
} from '@/core/vehicle/domain/vehicle.repository'
import {
  IUseCase,
  ListInputBase,
} from '@/core/shared/application/use-case.interface'
import { VehicleOutput, VehicleOutputMapper } from '../common/vehicle.output'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/core/shared/application/pagination-output'
import { SearchParamsConstructorProps } from '@/core/shared/domain/repository/search-params'

export class ListVehiclesUseCase
  implements IUseCase<ListVehiclesInput, ListVehiclesOutput>
{
  constructor(private repository: IVehicleRepository) {}

  async execute(input: ListVehiclesInput): Promise<ListVehiclesOutput> {
    const params = VehicleSearchParams.create(
      input as Omit<SearchParamsConstructorProps<VehicleFilter>, 'filter'>,
    )
    const searchResult = await this.repository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: VehicleSearchResult): ListVehiclesOutput {
    const { items: _items } = searchResult
    const items = _items.map((item) => VehicleOutputMapper.toOutput(item))
    return PaginationOutputMapper.toOutput(items, searchResult)
  }
}

export type ListVehiclesInput = ListInputBase<VehicleFilter>

export type ListVehiclesOutput = PaginationOutput<VehicleOutput>

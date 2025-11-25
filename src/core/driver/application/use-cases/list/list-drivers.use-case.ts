import {
  DriverFilter,
  DriverSearchParams,
  DriverSearchResult,
  IDriverRepository,
} from '@/core/driver/domain/driver.repository'
import {
  IUseCase,
  ListInputBase,
} from '@/core/shared/application/use-case.interface'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output'
import {
  DriverOutput,
  DriverOutputMapper,
} from '@/core/driver/application/use-cases/common/driver-output'

export class ListDriverUseCase
  implements IUseCase<ListDriverInput, ListDriverOutput>
{
  constructor(private repository: IDriverRepository) {}

  async execute(input: ListDriverInput): Promise<ListDriverOutput> {
    const params = new DriverSearchParams(input)
    const searchResult = await this.repository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: DriverSearchResult): ListDriverOutput {
    const { items: _items } = searchResult
    const items = _items.map((item) => DriverOutputMapper.toOutput(item))
    return PaginationOutputMapper.toOutput(items, searchResult)
  }
}

export type ListDriverInput = ListInputBase<DriverFilter>

export type ListDriverOutput = PaginationOutput<DriverOutput>

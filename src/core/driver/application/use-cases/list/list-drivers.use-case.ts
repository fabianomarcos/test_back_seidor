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
import { DriverOutput, DriverOutputMapper } from '../common/driver-output'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../pagination-output'

export class ListDriversUseCase
  implements IUseCase<ListDriversInput, ListDriversOutput>
{
  constructor(private repository: IDriverRepository) {}

  async execute(input: ListDriversInput): Promise<ListDriversOutput> {
    const params = new DriverSearchParams(input)
    const searchResult = await this.repository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: DriverSearchResult): ListDriversOutput {
    const { items: _items } = searchResult
    const items = _items.map((item) => DriverOutputMapper.toOutput(item))
    return PaginationOutputMapper.toOutput(items, searchResult)
  }
}

export type ListDriversInput = ListInputBase<DriverFilter>

export type ListDriversOutput = PaginationOutput<DriverOutput>

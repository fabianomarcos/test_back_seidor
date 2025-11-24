import { SortDirection } from '../domain/repository/search-params'

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Output>
}

export type ListInputBase<Filter> = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: Filter | null
}

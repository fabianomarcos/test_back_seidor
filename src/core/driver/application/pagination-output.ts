import { SearchResult } from '@/core/shared/domain/repository/search-result'

export type PaginationOutput<Item> = {
  items: Item[]
  total: number
  page: number
  per_page: number
  last_page: number
}

export class PaginationOutputMapper {
  static toOutput<Item>(
    items: Item[],
    props: Omit<SearchResult, 'items'>,
  ): PaginationOutput<Item> {
    return {
      items,
      total: props.total,
      page: props.page,
      per_page: props.per_page,
      last_page: props.last_page,
    }
  }
}

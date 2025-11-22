import { Entity } from '../entity'
import { ValueObject } from '../value-object'

type SearchResultConstructorProps<E extends Entity> = {
  items: E[]
  total: number
  page: number
  per_page: number
}

export class SearchResult<E extends Entity> extends ValueObject {
  readonly items: E[]
  readonly total: number
  readonly page: number
  readonly per_page: number
  readonly last_page: number

  constructor(props: SearchResultConstructorProps<E>) {
    super()
    this.items = props.items
    this.total = props.total
    this.page = props.page
    this.per_page = props.per_page
    this.last_page = Math.ceil(this.total / this.per_page)
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      page: this.page,
      per_page: this.per_page,
      last_page: this.last_page,
    }
  }
}

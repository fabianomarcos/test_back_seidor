import { Transform } from 'class-transformer'

export type PaginationPresenterProps = {
  page: number
  per_page: number
  total: number
  last_page: number
}

export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
  page: number
  @Transform(({ value }) => parseInt(value))
  per_page: number
  @Transform(({ value }) => parseInt(value))
  total: number
  @Transform(({ value }) => parseInt(value))
  last_page: number

  constructor(props: PaginationPresenterProps) {
    this.page = props.page
    this.per_page = props.per_page
    this.last_page = props.last_page
    this.total = props.total
  }
}

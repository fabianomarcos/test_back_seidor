import { Transform } from 'class-transformer'

import { DriverOutput } from '@/core/driver/application/use-cases/common/driver-output'
import { ListDriversOutput } from '@/core/driver/application/use-cases/list/list-drivers.use-case'
import { CollectionPresenter } from '@/core/shared/infra/presenters/collection.presenter'

export class DriverPresenter {
  id: string
  name: string
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date

  constructor(output: DriverOutput) {
    this.id = output.id
    this.name = output.name
    this.created_at = output.created_at
    this.updated_at = output.updated_at
  }
}

export class DriverCollectionPresenter extends CollectionPresenter<
  DriverPresenter[]
> {
  data: DriverPresenter[]

  constructor(output: ListDriversOutput) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map((item) => new DriverPresenter(item))
  }
}

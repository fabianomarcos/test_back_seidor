import { Transform } from 'class-transformer'

import { VehicleOutput } from '@/core/vehicle/application/use-cases/common/vehicle.output'
import { CollectionPresenter } from '@/core/shared/infra/presenters/collection.presenter'
import { ListVehiclesOutput } from '@/core/vehicle/application/use-cases/list/list-vehicles.use-case'

export class VehiclePresenter {
  id: string
  brand: string
  color: string
  plate: string
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date

  constructor(output: VehicleOutput) {
    this.id = output.id
    this.color = output.color
    this.brand = output.brand
    this.plate = output.plate
    this.created_at = output.created_at
    this.updated_at = output.updated_at
  }
}

export class VehicleCollectionPresenter extends CollectionPresenter<
  VehiclePresenter[]
> {
  data: VehiclePresenter[]

  constructor(output: ListVehiclesOutput) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map((item) => new VehiclePresenter(item))
  }
}

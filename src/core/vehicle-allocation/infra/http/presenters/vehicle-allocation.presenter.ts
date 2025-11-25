import { Transform } from 'class-transformer'

import { VehicleAllocationOutput } from '@/core/vehicle-allocation/application/use-cases/common/vehicle-allocation.output'
import { CollectionPresenter } from '@/core/shared/infra/presenters/collection.presenter'
import { ListVehicleAllocationsOutput } from '@/core/vehicle-allocation/application/use-cases/list/list-vehicle-allocations.use-case'
import { Driver } from '@/core/driver/domain/driver.aggregate'
import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'

export class VehicleAllocationPresenter {
  id: string
  driver_id: string
  vehicle_id: string
  reason: string
  @Transform(({ value }: { value: Date }) => value.toISOString())
  start_date: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  end_date: Date | null
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date
  driver: Driver
  vehicle: Vehicle

  constructor(output: VehicleAllocationOutput) {
    this.id = output.id
    this.start_date = output.start_date
    this.end_date = output.end_date
    this.driver_id = output.driver_id
    this.end_date = output.end_date
    this.created_at = output.created_at
    this.updated_at = output.updated_at
    this.driver = output.driver
    this.vehicle = output.vehicle
  }
}

export class VehicleAllocationCollectionPresenter extends CollectionPresenter<
  VehicleAllocationPresenter[]
> {
  data: VehicleAllocationPresenter[]

  constructor(output: ListVehicleAllocationsOutput) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map((item) => new VehicleAllocationPresenter(item))
  }
}

import { Chance } from 'chance'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from './vehicle-allocation.aggregate'
import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'

type PropOrFactory<T> = T | ((index: number) => T)

export class VehicleAllocationFakeBuilder<TBuild = any> {
  private _allocation_id: PropOrFactory<VehicleAllocationId> | undefined =
    undefined
  private _driver_id: PropOrFactory<DriverId> | undefined = undefined
  private _vehicle_id: PropOrFactory<VehicleId> | undefined = undefined
  private _reason: PropOrFactory<string> = (_index) => new Chance().word()
  private _start_date: PropOrFactory<Date> | undefined = undefined
  private _end_date: PropOrFactory<Date> | undefined = undefined
  private _created_at: PropOrFactory<Date> | undefined = undefined
  private _updated_at: PropOrFactory<Date> | undefined = undefined

  private countObjs

  static aVehicleAllocation() {
    return new VehicleAllocationFakeBuilder<VehicleAllocation>()
  }

  static theVehicleAllocations(countObjs: number) {
    return new VehicleAllocationFakeBuilder<VehicleAllocation[]>(countObjs)
  }

  chance = new Chance()

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs
    this.chance = Chance()
  }

  withInvalidReasonTooLong(value?: string) {
    this._reason = value || this.chance.string({ length: 256 })
    return this
  }

  withVehicleAllocationId(valueOrFactory: PropOrFactory<VehicleAllocationId>) {
    this._allocation_id = valueOrFactory
    return this
  }

  withVehicleId(valueOrFactory: PropOrFactory<VehicleAllocationId>) {
    this._vehicle_id = valueOrFactory
    return this
  }

  withDriverId(valueOrFactory: PropOrFactory<VehicleAllocationId>) {
    this._driver_id = valueOrFactory
    return this
  }

  withReason(valueOrFactory: PropOrFactory<string>) {
    this._reason = valueOrFactory
    return this
  }
  withStartDate(valueOrFactory: PropOrFactory<Date>) {
    this._start_date = valueOrFactory
    return this
  }
  withEndDate(valueOrFactory: PropOrFactory<Date>) {
    this._end_date = valueOrFactory
    return this
  }
  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory
    return this
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory
    return this
  }

  build(): TBuild {
    const vehicles = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const vehicle = new VehicleAllocation({
          allocation_id: !this._allocation_id
            ? undefined
            : this.callFactory(this._allocation_id, index),
          driver_id: this.callFactory(this._driver_id, index),
          vehicle_id: this.callFactory(this._vehicle_id, index),
          reason: this.callFactory(this._reason, index),
          start_date: this.callFactory(this._start_date, index),
          ...(this._end_date && {
            _end_date: this.callFactory(this._end_date, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
        })
        vehicle.validate()
        return vehicle
      })

    return this.countObjs === 1 ? (vehicles[0] as any) : (vehicles as any)
  }

  get allocation_id() {
    return this.getValue('allocation_id')
  }

  get vehicle_id() {
    return this.getValue('vehicle_id')
  }

  get driver_id() {
    return this.getValue('driver_id')
  }

  get start_date() {
    return this.getValue('start_date')
  }

  get end_date() {
    return this.getValue('start_date')
  }

  get created_at() {
    return this.getValue('created_at')
  }

  get updated_at() {
    return this.getValue('updated_at')
  }

  private getValue(
    prop:
      | 'allocation_id'
      | 'vehicle_id'
      | 'driver_id'
      | 'start_date'
      | 'end_date'
      | 'created_at'
      | 'updated_at',
  ) {
    const optional = ['allocation_id', 'end_date', 'created_at', 'updated_at']
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && optional.includes(prop))
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)

    return this.callFactory(this[privateProp], 0)
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue
  }
}

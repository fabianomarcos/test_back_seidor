import { Chance } from 'chance'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from './vehicle-allocation.aggregate'

type PropOrFactory<T> = T | ((index: number) => T)

const chance = new Chance()

const placaAntiga = () =>
  `${chance.string({
    length: 3,
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  })}-${chance.integer({ min: 1000, max: 9999 })}`

export class VehicleAllocationFakeBuilder<TBuild = any> {
  private _vehicle_id: PropOrFactory<VehicleAllocationId> | undefined =
    undefined
  private _plate: PropOrFactory<string> = (_index) => placaAntiga()
  private _color: PropOrFactory<string> = (_index) => new Chance().color()
  private _brand: PropOrFactory<string> = (_index) => new Chance().name()
  private _created_at: PropOrFactory<Date> | undefined = undefined
  private _updated_at: PropOrFactory<Date> | undefined = undefined

  private countObjs

  static aVehicleAllocation() {
    return new VehicleAllocationFakeBuilder<VehicleAllocation>()
  }

  static theVehicleAllocations(countObjs: number) {
    return new VehicleAllocationFakeBuilder<VehicleAllocation[]>(countObjs)
  }

  private chance: Chance.Chance

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs
    this.chance = Chance()
  }

  withVehicleAllocationId(valueOrFactory: PropOrFactory<VehicleAllocationId>) {
    this._vehicle_id = valueOrFactory
    return this
  }

  withBrand(valueOrFactory: PropOrFactory<string>) {
    this._brand = valueOrFactory
    return this
  }

  withPlate(valueOrFactory: PropOrFactory<string>) {
    this._plate = valueOrFactory
    return this
  }
  withColor(valueOrFactory: PropOrFactory<string>) {
    this._color = valueOrFactory
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

  withInvalidPlateTooLong(value?: string) {
    this._plate = value || this.chance.string({ length: 9 })
    return this
  }

  withInvalidBrandTooLong(value?: string) {
    this._brand = value || this.chance.string({ length: 256 })
    return this
  }

  withInvalidColorTooLong(value?: string) {
    this._color = value || this.chance.string({ length: 256 })
    return this
  }

  build(): TBuild {
    const vehicles = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const vehicle = new VehicleAllocation({
          vehicle_id: !this._vehicle_id
            ? undefined
            : this.callFactory(this._vehicle_id, index),
          plate: this.callFactory(this._plate, index),
          color: this.callFactory(this._color, index),
          brand: this.callFactory(this._brand, index),
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

  get vehicle_id() {
    return this.getValue('vehicle_id')
  }

  get plate() {
    return this.getValue('plate')
  }

  get brand() {
    return this.getValue('brand')
  }

  get created_at() {
    return this.getValue('created_at')
  }

  get updated_at() {
    return this.getValue('updated_at')
  }

  private getValue(
    prop: 'vehicle_id' | 'brand' | 'plate' | 'created_at' | 'updated_at',
  ) {
    const optional = ['vehicle_id', 'created_at', 'updated_at']
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

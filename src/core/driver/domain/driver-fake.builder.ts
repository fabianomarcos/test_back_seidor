import { Chance } from 'chance'
import { Driver, DriverId } from './driver.aggregate'

type PropOrFactory<T> = T | ((index: number) => T)

export class DriverFakeBuilder<TBuild = any> {
  private _driver_id: PropOrFactory<DriverId> | undefined = undefined
  private _name: PropOrFactory<string> = (_index) => new Chance().name()
  private _created_at: PropOrFactory<Date> | undefined = undefined
  private _updated_at: PropOrFactory<Date> | undefined = undefined

  private countObjs

  static aDriver() {
    return new DriverFakeBuilder<Driver>()
  }

  static theDrivers(countObjs: number) {
    return new DriverFakeBuilder<Driver[]>(countObjs)
  }

  private chance: Chance.Chance

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs
    this.chance = Chance()
  }

  withDriverId(valueOrFactory: PropOrFactory<DriverId>) {
    this._driver_id = valueOrFactory
    return this
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory
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

  withInvalidNameTooLong(value?: string) {
    this._name = value || this.chance.string({ length: 256 })
    return this
  }

  build(): TBuild {
    const drivers = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const driver = new Driver({
          driver_id: !this._driver_id
            ? undefined
            : this.callFactory(this._driver_id, index),
          name: this.callFactory(this._name, index),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
        })
        driver.validate()
        return driver
      })

    return this.countObjs === 1 ? (drivers[0] as any) : (drivers as any)
  }

  get driver_id() {
    return this.getValue('driver_id')
  }

  get name() {
    return this.getValue('name')
  }

  get created_at() {
    return this.getValue('created_at')
  }

  get updated_at() {
    return this.getValue('updated_at')
  }

  private getValue(prop: 'driver_id' | 'name' | 'created_at' | 'updated_at') {
    const optional = ['driver_id', 'created_at', 'updated_at']
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

import { AggregateRoot } from '../../shared/domain/aggregate-root'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { DriverFakeBuilder } from './driver-fake.builder'
import { DriverValidatorFactory } from './driver.validator'

export type DriverConstructorProps = {
  driver_id?: DriverId
  name: string
  created_at?: Date
  updated_at?: Date
}

export type DriverCreateCommand = {
  name: string
}

export class DriverId extends Uuid {}

export class Driver extends AggregateRoot {
  driver_id: DriverId
  name: string
  created_at: Date
  updated_at: Date

  constructor(props: DriverConstructorProps) {
    super()
    this.driver_id = props.driver_id || new DriverId()
    this.name = props.name
    this.created_at = props.created_at || new Date()
    this.updated_at = props.updated_at || new Date()
  }

  get entity_id() {
    return this.driver_id
  }

  static create(props: DriverCreateCommand) {
    const driver = new Driver(props)
    driver.validate(['name'])
    return driver
  }

  changeName(name: string): void {
    this.name = name
    this.updated_at = new Date()
    this.validate(['name'])
  }

  validate(fields?: string[]) {
    const validator = DriverValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  static fake() {
    return DriverFakeBuilder
  }

  toJSON() {
    return {
      driver_id: this.driver_id.value,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

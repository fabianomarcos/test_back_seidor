import { AggregateRoot } from '../../shared/domain/aggregate-root'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { VehicleFakeBuilder } from './vehicle-fake.builder'
import { VehicleValidatorFactory } from './vehicle.validator'

export type VehicleConstructorProps = {
  vehicle_id?: VehicleId
  plate: string
  brand: string
  color: string
  created_at?: Date
  updated_at?: Date
}

export type VehicleCreateCommand = {
  plate: string
  brand: string
  color: string
}

export class VehicleId extends Uuid {}

export class Vehicle extends AggregateRoot {
  vehicle_id: VehicleId
  plate: string
  brand: string
  color: string
  created_at: Date
  updated_at: Date

  constructor(props: VehicleConstructorProps) {
    super()
    this.vehicle_id = props.vehicle_id || new VehicleId()
    this.brand = props.brand
    this.plate = props.plate
    this.color = props.color
    this.created_at = props.created_at || new Date()
    this.updated_at = props.updated_at || new Date()
  }

  get entity_id() {
    return this.vehicle_id
  }

  static create(props: VehicleCreateCommand) {
    const vehicle = new Vehicle(props)
    vehicle.validate()
    return vehicle
  }

  changeBrand(brand: string): void {
    this.brand = brand
    this.validate(['brand'])
  }

  changePlate(plate: string): void {
    this.plate = plate
    this.validate(['plate'])
  }

  changeColor(color: string): void {
    this.color = color
    this.validate(['color'])
  }

  validate(fields?: string[]) {
    const validator = VehicleValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  static fake() {
    return VehicleFakeBuilder
  }

  toJSON() {
    return {
      vehicle_id: this.vehicle_id.value,
      plate: this.plate,
      brand: this.brand,
      color: this.color,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

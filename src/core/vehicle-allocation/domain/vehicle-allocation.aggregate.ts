import { AggregateRoot } from '../../shared/domain/aggregate-root'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { VehicleAllocationFakeBuilder } from './vehicle-allocation-fake.builder'
import { VehicleAllocationValidatorFactory } from './vehicle-allocation.validator'

export type VehicleAllocationConstructorProps = {
  vehicle_id?: VehicleAllocationId
  plate: string
  brand: string
  color: string
  created_at?: Date
  updated_at?: Date
}

export type VehicleAllocationCreateCommand = {
  plate: string
  brand: string
  color: string
}

export class VehicleAllocationId extends Uuid {}

export class VehicleAllocation extends AggregateRoot {
  vehicle_id: VehicleAllocationId
  plate: string
  brand: string
  color: string
  created_at: Date
  updated_at: Date

  constructor(props: VehicleAllocationConstructorProps) {
    super()
    this.vehicle_id = props.vehicle_id || new VehicleAllocationId()
    this.brand = props.brand
    this.plate = props.plate
    this.color = props.color
    this.created_at = props.created_at || new Date()
    this.updated_at = props.updated_at || new Date()
  }

  get entity_id() {
    return this.vehicle_id
  }

  static create(props: VehicleAllocationCreateCommand) {
    const vehicle = new VehicleAllocation(props)
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
    const validator = VehicleAllocationValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  static fake() {
    return VehicleAllocationFakeBuilder
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

import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { AggregateRoot } from '../../shared/domain/aggregate-root'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { VehicleAllocationFakeBuilder } from './vehicle-allocation-fake.builder'
import { VehicleAllocationValidatorFactory } from './vehicle-allocation.validator'
import { DriverId } from '@/core/driver/domain/driver.aggregate'

export type VehicleAllocationConstructorProps = {
  allocation_id?: VehicleAllocationId
  vehicle_id: VehicleId
  driver_id: DriverId
  reason: string
  start_date: Date
  end_date?: Date | null
  created_at?: Date
  updated_at?: Date
}

export type VehicleAllocationCreateCommand = {
  vehicle_id: VehicleId
  driver_id: DriverId
  reason: string
  start_date: Date
  end_date?: Date | null
}

export class VehicleAllocationId extends Uuid {}

export class VehicleAllocation extends AggregateRoot {
  allocation_id: VehicleAllocationId
  vehicle_id: VehicleId
  driver_id: DriverId
  reason: string
  start_date: Date
  end_date?: Date | null
  created_at?: Date
  updated_at?: Date

  constructor(props: VehicleAllocationConstructorProps) {
    super()
    this.allocation_id = props.allocation_id || new VehicleAllocationId()
    this.vehicle_id = props.vehicle_id || new VehicleId()
    this.driver_id = props.driver_id || new DriverId()
    this.reason = props.reason
    this.start_date = props.start_date || new Date()
    this.end_date = props.end_date || null
    this.created_at = props.created_at || new Date()
    this.updated_at = props.updated_at || new Date()
  }

  get entity_id() {
    return this.allocation_id
  }

  static create(props: VehicleAllocationCreateCommand) {
    const vehicle = new VehicleAllocation(props)
    vehicle.validate()
    return vehicle
  }

  changeReason(reason: string): void {
    this.reason = reason
    this.validate(['reason'])
  }

  changeStartDate(start_date: Date): void {
    this.start_date = start_date
    this.validate(['start_date'])
  }

  changeEndDate(end_date: Date): void {
    this.end_date = end_date
    this.validate(['end_date'])
  }

  changeDriverId(driver_id: DriverId): void {
    this.driver_id = driver_id
    this.validate(['driver_id'])
  }

  changeVehicleId(vehicle_id: VehicleId): void {
    this.vehicle_id = vehicle_id
    this.validate(['vehicle_id'])
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
      allocation_id: this.allocation_id.value,
      vehicle_id: this.vehicle_id.value,
      driver_id: this.driver_id.value,
      reason: this.reason,
      start_date: this.start_date,
      end_date: this.end_date,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

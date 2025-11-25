import { DriverOutput } from '@/core/driver/application/use-cases/common/driver-output'
import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'
import { VehicleOutput } from '@/core/vehicle/application/use-cases/common/vehicle.output'
import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'
import { Driver } from '@/core/driver/domain/driver.aggregate'

export type VehicleAllocationOutput = {
  id: string
  driver_id: string
  vehicle_id: string
  vehicle: Vehicle
  driver: Driver
  reason: string
  start_date: Date
  end_date: Date | null
  created_at: Date
  updated_at: Date
}

export class VehicleAllocationOutputMapper {
  static toOutput(entity: VehicleAllocation): VehicleAllocationOutput {
    return {
      id: entity.id,
      driver: entity.driver,
      vehicle: entity.vehicle,
      created_at: entity.created_at,
      end_date: entity.end_date,
      driver_id: entity.driver_id.value,
      reason: entity.reason,
      start_date: entity.start_date,
      updated_at: entity.updated_at,
      vehicle_id: entity.vehicle_id,
    } as unknown as VehicleAllocationOutput
  }
}

export type VehicleAllocationWithDriverAndVehicleOutput =
  VehicleAllocationOutput & {
    driver: DriverOutput
    vehicle: VehicleOutput
    allocation_id: string
  }

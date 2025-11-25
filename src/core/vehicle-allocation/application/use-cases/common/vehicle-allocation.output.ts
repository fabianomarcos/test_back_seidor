import { DriverOutput } from '@/core/driver/application/use-cases/common/driver-output'
import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'
import { VehicleOutput } from '@/core/vehicle/application/use-cases/common/vehicle.output'

export type VehicleAllocationOutput = {
  id: string
  driver_id: string
  vehicle_id: string
  reason: string
  start_date: Date
  end_date: Date | null
  created_at: Date
  updated_at: Date
}

export class VehicleAllocationOutputMapper {
  static toOutput(entity: VehicleAllocation): VehicleAllocationOutput {
    const { allocation_id, ...otherProps } = entity.toJSON()
    return {
      id: allocation_id,
      ...otherProps,
    } as VehicleAllocationOutput
  }
}

export type VehicleAllocationWithDriverAndVehicleOutput =
  VehicleAllocationOutput & {
    driver: DriverOutput
    vehicle: VehicleOutput
    allocation_id: string
  }

import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'

export type VehicleAllocationOutput = {
  id: string
  driver_id: string
  vehicle_id: string
  reason: string
  start_date: Date
  end_date: Date
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

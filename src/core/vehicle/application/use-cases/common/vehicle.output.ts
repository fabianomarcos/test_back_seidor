import { Vehicle } from '../../../domain/vehicle.aggregate'

export type VehicleOutput = {
  id: string
  brand: string
  plate: string
  color: string
  created_at: Date
  updated_at: Date
}

export class VehicleOutputMapper {
  static toOutput(entity: Vehicle): VehicleOutput {
    const { vehicle_id, ...otherProps } = entity.toJSON()
    return {
      id: vehicle_id,
      ...otherProps,
    }
  }
}

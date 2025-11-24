import { Driver } from '@/core/driver/domain/driver.aggregate'

export type DriverOutput = {
  id: string
  name: string
  created_at: Date
  updated_at: Date
}

export class DriverOutputMapper {
  static toOutput(entity: Driver): DriverOutput {
    const { driver_id, ...props } = entity.toJSON()
    return {
      id: driver_id,
      ...props,
    }
  }
}

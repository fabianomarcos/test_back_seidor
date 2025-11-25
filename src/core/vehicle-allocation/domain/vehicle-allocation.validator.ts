import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator'
import { VehicleAllocation } from './vehicle-allocation.aggregate'
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields'
import { Notification } from '../../shared/domain/validators/notification'

export class VehicleAllocationRules {
  @IsDate({ groups: ['start_date'] })
  @IsOptional({ groups: ['start_date'] })
  start_date?: Date

  @IsDate({ groups: ['end_date'] })
  @IsOptional({ groups: ['end_date'] })
  end_date?: Date | null

  @IsString({ groups: ['reason'] })
  @IsOptional({ groups: ['reason'] })
  @MinLength(2, { groups: ['reason'] })
  @MaxLength(255, { groups: ['reason'] })
  reason: string

  @IsString({ groups: ['driver_id'] })
  @IsOptional({ groups: ['driver_id'] })
  @ValidateIf((o) => o.driver_id)
  driver_id: string

  @IsString({ groups: ['vehicle_id'] })
  @IsOptional({ groups: ['vehicle_id'] })
  @ValidateIf((o) => o.vehicle_id)
  vehicle_id: string

  constructor(entity: VehicleAllocation) {
    Object.assign(this, entity)
  }
}

export class VehicleAllocationValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['reason']
    return super.validate(
      notification,
      new VehicleAllocationRules(data),
      newFields,
    )
  }
}

export class VehicleAllocationValidatorFactory {
  static create() {
    return new VehicleAllocationValidator()
  }
}

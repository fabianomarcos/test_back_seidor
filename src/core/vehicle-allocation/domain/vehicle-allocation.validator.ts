import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { VehicleAllocation } from './vehicle-allocation.aggregate'
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields'
import { Notification } from '../../shared/domain/validators/notification'

export class VehicleAllocationRules {
  @IsDate({ groups: ['start_date'] })
  @IsNotEmpty({ groups: ['start_date'] })
  start_date: Date

  @IsDate({ groups: ['end_date'] })
  @IsEmpty({ groups: ['end_date'] })
  end_date?: Date | null

  @MinLength(2, { groups: ['reason'] })
  @IsString({ groups: ['reason'] })
  @MaxLength(255, { groups: ['reason'] })
  @IsNotEmpty({ groups: ['reason'] })
  reason: string

  constructor(entity: VehicleAllocation) {
    Object.assign(this, entity)
  }
}

export class VehicleAllocationValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['plate']
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

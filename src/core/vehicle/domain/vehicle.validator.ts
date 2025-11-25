import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { Vehicle } from './vehicle.aggregate'
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields'
import { Notification } from '../../shared/domain/validators/notification'

export class VehicleRules {
  @MinLength(8, { groups: ['plate'] })
  @IsString({ groups: ['plate'] })
  @MaxLength(8, { groups: ['plate'] })
  @IsNotEmpty({ groups: ['plate'] })
  plate: string

  @MinLength(2, { groups: ['brand'] })
  @IsString({ groups: ['brand'] })
  @MaxLength(255, { groups: ['brand'] })
  @IsNotEmpty({ groups: ['brand'] })
  brand: string

  @MinLength(2, { groups: ['color'] })
  @IsString({ groups: ['color'] })
  @MaxLength(255, { groups: ['color'] })
  @IsNotEmpty({ groups: ['color'] })
  color: string

  constructor(entity: Vehicle) {
    Object.assign(this, entity)
  }
}

export class VehicleValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['plate']
    return super.validate(notification, new VehicleRules(data), newFields)
  }
}

export class VehicleValidatorFactory {
  static create() {
    return new VehicleValidator()
  }
}

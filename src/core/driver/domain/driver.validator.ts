import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { Driver } from './driver.aggregate'
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields'
import { Notification } from '../../shared/domain/validators/notification'

export class DriverRules {
  @MinLength(2, { groups: ['name'] })
  @IsString({ groups: ['name'] })
  @MaxLength(255, { groups: ['name'] })
  @IsNotEmpty({ groups: ['name'] })
  name!: string

  constructor(entity: Driver) {
    Object.assign(this, entity)
  }
}

export class DriverValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['name']
    return super.validate(notification, new DriverRules(data), newFields)
  }
}

export class DriverValidatorFactory {
  static create() {
    return new DriverValidator()
  }
}

import { validateSync } from 'class-validator'
import { Notification } from './notification'
import { IValidatorFields } from './validator-fields-interface'

export abstract class ClassValidatorFields implements IValidatorFields {
  validate(
    notification: Notification,
    entity: any,
    fields?: string[],
  ): boolean {
    const toValidateFields = fields?.length ? fields : Object.keys(entity)
    const errors = validateSync(entity, { groups: toValidateFields })

    if (errors.length > 0) {
      errors.forEach((error) => {
        const constraints = error.constraints
        if (constraints)
          Object.values(constraints).forEach((message) =>
            notification.addError(message, error.property),
          )
      })
      return false
    }
    return true
  }
}

import { IUseCase } from '../../../../shared/application/use-case.interface'
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error'
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error'
import { Driver, DriverId } from '../../../domain/driver.aggregate'
import { IDriverRepository } from '../../../domain/driver.repository'
import { DriverOutput, DriverOutputMapper } from '../common/driver-output'
import { UpdateDriverInput } from './update-driver.input'

export class UpdateDriverUseCase
  implements IUseCase<UpdateDriverInput, UpdateDriverOutput>
{
  constructor(private driverRepo: IDriverRepository) {}

  async execute(input: UpdateDriverInput): Promise<UpdateDriverOutput> {
    const driverId = new DriverId(input.id)
    const driver = await this.driverRepo.findById(driverId)

    if (!driver) {
      throw new NotFoundError(input.id, Driver)
    }

    input.name && driver.changeName(input.name)

    if (driver.notification.hasErrors()) {
      throw new EntityValidationError(driver.notification.toJSON())
    }

    await this.driverRepo.update(driver)

    return DriverOutputMapper.toOutput(driver)
  }
}

export type UpdateDriverOutput = DriverOutput

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateDriverInput } from './create-driver.input'
import { DriverOutput, DriverOutputMapper } from './common/driver-output'
import { IDriverRepository } from '../../domain/driver.repository'
import { Driver } from '../../domain/driver.aggregate'
import { EntityValidationError } from '@/core/shared/domain/validators/validation.error'

export type CreateDriverOutput = DriverOutput

export class CreateDriverUseCase
  implements IUseCase<CreateDriverInput, CreateDriverOutput>
{
  constructor(private readonly driverRepository: IDriverRepository) {}

  async execute(input: CreateDriverInput): Promise<DriverOutput> {
    const entity = Driver.create(input)

    if (entity.notification.hasErrors())
      throw new EntityValidationError(entity.notification.toJSON())

    await this.driverRepository.insert(entity)

    return DriverOutputMapper.toOutput(entity)
  }
}

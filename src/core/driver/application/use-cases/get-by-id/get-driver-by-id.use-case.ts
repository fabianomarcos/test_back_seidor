import { Driver, DriverId } from '@/core/driver/domain/driver.aggregate'
import { IDriverRepository } from '@/core/driver/domain/driver.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import { DriverOutput, DriverOutputMapper } from '../common/driver-output'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
export class GetDriverByIdUseCase
  implements IUseCase<GetDriverInput, GetDriverOutput>
{
  constructor(private repository: IDriverRepository) {}

  async execute(input: GetDriverInput): Promise<GetDriverOutput> {
    const driverId = new DriverId(input.id)
    const driver = await this.repository.findById(driverId)
    if (!driver) throw new NotFoundError(input.id, Driver)
    return DriverOutputMapper.toOutput(driver)
  }
}

export type GetDriverInput = {
  id: string
}

export type GetDriverOutput = DriverOutput

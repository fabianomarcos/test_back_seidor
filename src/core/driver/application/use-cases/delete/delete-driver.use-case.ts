import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { IDriverRepository } from '@/core/driver/domain/driver.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'

export class DeleteDriverUseCase
  implements IUseCase<DeleteDriverInput, DeleteDriverOutput>
{
  constructor(private driverRepo: IDriverRepository) {}

  async execute(input: DeleteDriverInput): Promise<DeleteDriverOutput> {
    const driverId = new DriverId(input.id)
    await this.driverRepo.delete(driverId)
  }
}

export type DeleteDriverInput = {
  id: string
}

type DeleteDriverOutput = void

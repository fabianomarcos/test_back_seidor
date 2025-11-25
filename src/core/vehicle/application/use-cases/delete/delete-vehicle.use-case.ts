import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { IVehicleRepository } from '@/core/vehicle/domain/vehicle.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'

export class DeleteVehicleUseCase
  implements IUseCase<DeleteVehicleInput, DeleteVehicleOutput>
{
  constructor(private vehicleRepo: IVehicleRepository) {}

  async execute(input: DeleteVehicleInput): Promise<DeleteVehicleOutput> {
    const vehicleId = new VehicleId(input.id)
    await this.vehicleRepo.delete(vehicleId)
  }
}

export type DeleteVehicleInput = {
  id: string
}

type DeleteVehicleOutput = void

import { Vehicle, VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { IVehicleRepository } from '@/core/vehicle/domain/vehicle.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import { VehicleOutput, VehicleOutputMapper } from '../common/vehicle.output'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
export class GetVehicleByIdUseCase
  implements IUseCase<GetVehicleInput, GetVehicleOutput>
{
  constructor(private repository: IVehicleRepository) {}

  async execute(input: GetVehicleInput): Promise<GetVehicleOutput> {
    const vehicleId = new VehicleId(input.id)
    const vehicle = await this.repository.findById(vehicleId)
    if (!vehicle) throw new NotFoundError(input.id, Vehicle)
    return VehicleOutputMapper.toOutput(vehicle)
  }
}

export type GetVehicleInput = {
  id: string
}

export type GetVehicleOutput = VehicleOutput

import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleInput } from './create-vehicle.input'
import { VehicleOutput, VehicleOutputMapper } from '../common/vehicle.output'
import { IVehicleRepository } from '../../../domain/vehicle.repository'
import { Vehicle } from '../../../domain/vehicle.aggregate'
import { EntityValidationError } from '@/core/shared/domain/validators/validation.error'

export type CreateVehicleOutput = VehicleOutput

export class CreateVehicleUseCase
  implements IUseCase<CreateVehicleInput, CreateVehicleOutput>
{
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(input: CreateVehicleInput): Promise<VehicleOutput> {
    const entity = Vehicle.create(input)

    if (entity.notification.hasErrors())
      throw new EntityValidationError(entity.notification.toJSON())

    await this.vehicleRepository.insert(entity)

    return VehicleOutputMapper.toOutput(entity)
  }
}

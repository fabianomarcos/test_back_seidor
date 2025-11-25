import { IUseCase } from '../../../../shared/application/use-case.interface'
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error'
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error'
import { Vehicle, VehicleId } from '../../../domain/vehicle.aggregate'
import { IVehicleRepository } from '../../../domain/vehicle.repository'
import { VehicleOutput, VehicleOutputMapper } from '../common/vehicle.output'
import { UpdateVehicleInput } from './update-vehicle.input'

export class UpdateVehicleUseCase
  implements IUseCase<UpdateVehicleInput, UpdateVehicleOutput>
{
  constructor(private vehicleRepo: IVehicleRepository) {}

  async execute(input: UpdateVehicleInput): Promise<UpdateVehicleOutput> {
    const vehicleId = new VehicleId(input.id)
    const vehicle = await this.vehicleRepo.findById(vehicleId)

    if (!vehicle) throw new NotFoundError(input.id, Vehicle)

    input.brand && vehicle.changeBrand(input.brand)
    input.color && vehicle.changeColor(input.color)
    input.plate && vehicle.changePlate(input.plate)

    if (vehicle.notification.hasErrors()) {
      throw new EntityValidationError(vehicle.notification.toJSON())
    }

    await this.vehicleRepo.update(vehicle)

    return VehicleOutputMapper.toOutput(vehicle)
  }
}

export type UpdateVehicleOutput = VehicleOutput

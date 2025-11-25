import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { IUseCase } from '../../../../shared/application/use-case.interface'
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error'
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '../../../domain/vehicle-allocation.aggregate'
import { IVehicleAllocationRepository } from '../../../domain/vehicle-allocation.repository'
import {
  VehicleAllocationOutput,
  VehicleAllocationOutputMapper,
} from '../common/vehicle-allocation.output'
import { UpdateVehicleAllocationInput } from './update-vehicle-allocation.input'
import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'

export class UpdateVehicleAllocationUseCase
  implements
    IUseCase<UpdateVehicleAllocationInput, UpdateVehicleAllocationOutput>
{
  constructor(private vehicleRepo: IVehicleAllocationRepository) {}

  async execute(
    input: UpdateVehicleAllocationInput,
  ): Promise<UpdateVehicleAllocationOutput> {
    const vehicleAllocationId = new VehicleAllocationId(input.id)
    const allocation = await this.vehicleRepo.findById(vehicleAllocationId)

    if (!allocation) throw new NotFoundError(input.id, VehicleAllocation)

    input.start_date && allocation.changeStartDate(input.start_date)
    input.end_date && allocation.changeEndDate(input.end_date)
    input.driver_id && allocation.changeDriverId(new DriverId(input.driver_id))
    input.vehicle_id &&
      allocation.changeVehicleId(new VehicleId(input.vehicle_id))
    input.reason && allocation.changeReason(input.reason)

    if (allocation.notification.hasErrors()) {
      throw new EntityValidationError(allocation.notification.toJSON())
    }

    await this.vehicleRepo.update(allocation)

    return VehicleAllocationOutputMapper.toOutput(allocation)
  }
}

export type UpdateVehicleAllocationOutput = VehicleAllocationOutput

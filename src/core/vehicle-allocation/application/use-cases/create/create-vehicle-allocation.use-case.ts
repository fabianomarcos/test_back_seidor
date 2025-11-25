import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleAllocationInput } from './create-vehicle-allocation.input'
import {
  VehicleAllocationOutput,
  VehicleAllocationOutputMapper,
} from '../common/vehicle-allocation.output'
import { IVehicleAllocationRepository } from '../../../domain/vehicle-allocation.repository'
import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'
import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'
import { EntityValidationError } from '@/core/shared/domain/validators/validation.error'
import { BadRequestError } from '@/core/shared/domain/errors/bad-request.error'

export type CreateVehicleAllocationOutput = VehicleAllocationOutput

export class CreateVehicleAllocationUseCase
  implements
    IUseCase<CreateVehicleAllocationInput, CreateVehicleAllocationOutput>
{
  constructor(private allocationRepository: IVehicleAllocationRepository) {}

  async execute(
    input: CreateVehicleAllocationInput,
  ): Promise<VehicleAllocationOutput> {
    const vehicleInUse = await this.allocationRepository.findOne({
      vehicle_id: input.vehicle_id,
      filter: {
        key: 'end_date',
        value: null,
      },
    })

    if (vehicleInUse)
      throw new BadRequestError(
        `Vehicle in use - plate ${vehicleInUse.vehicle.plate}`,
      )

    const driverAllocate = await this.allocationRepository.findOne({
      drive_id: input.driver_id,
      filter: {
        key: 'end_date',
        value: null,
      },
    })

    if (driverAllocate)
      throw new BadRequestError(
        `The Driver ${driverAllocate.driver.name} not was unavailable for new assignment.`,
      )

    const entity = VehicleAllocation.create({
      ...input,
      driver_id: new DriverId(input.driver_id),
      vehicle_id: new VehicleId(input.vehicle_id),
    })

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON())
    }

    await this.allocationRepository.insert(entity)

    return VehicleAllocationOutputMapper.toOutput(entity)
  }
}

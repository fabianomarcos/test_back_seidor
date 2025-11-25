import { IUseCase } from '@/core/shared/application/use-case.interface'
import { CreateVehicleAllocationInput } from './create-vehicle-allocation.input'
import {
  VehicleAllocationOutput,
  VehicleAllocationOutputMapper,
} from '../common/vehicle-allocation.output'
import { IVehicleAllocationRepository } from '../../../domain/vehicle-allocation.repository'
import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'
import { EntityValidationError } from '@/core/shared/domain/validators/validation.error'

export type CreateVehicleAllocationOutput = VehicleAllocationOutput

export class CreateVehicleAllocationUseCase
  implements
    IUseCase<CreateVehicleAllocationInput, CreateVehicleAllocationOutput>
{
  constructor(private vehicleRepository: IVehicleAllocationRepository) {}

  async execute(
    input: CreateVehicleAllocationInput,
  ): Promise<VehicleAllocationOutput> {
    const entity = VehicleAllocation.create(input as any)

    if (entity.notification.hasErrors())
      throw new EntityValidationError(entity.notification.toJSON())

    await this.vehicleRepository.insert(entity)

    return VehicleAllocationOutputMapper.toOutput(entity)
  }
}

import {
  VehicleAllocation,
  VehicleAllocationId,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { IVehicleAllocationRepository } from '@/core/vehicle-allocation/domain/vehicle-allocation.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'
import {
  VehicleAllocationOutput,
  VehicleAllocationOutputMapper,
} from '../common/vehicle-allocation.output'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
export class GetVehicleAllocationByIdUseCase
  implements IUseCase<GetVehicleAllocationInput, GetVehicleAllocationOutput>
{
  constructor(private repository: IVehicleAllocationRepository) {}

  async execute(
    input: GetVehicleAllocationInput,
  ): Promise<GetVehicleAllocationOutput> {
    const vehicleId = new VehicleAllocationId(input.id)
    const vehicle = await this.repository.findById(vehicleId)
    if (!vehicle) throw new NotFoundError(input.id, VehicleAllocation)
    return VehicleAllocationOutputMapper.toOutput(vehicle)
  }
}

export type GetVehicleAllocationInput = {
  id: string
}

export type GetVehicleAllocationOutput = VehicleAllocationOutput

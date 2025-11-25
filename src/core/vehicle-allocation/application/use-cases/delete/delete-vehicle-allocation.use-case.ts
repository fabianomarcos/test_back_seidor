import { VehicleAllocationId } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { IVehicleAllocationRepository } from '@/core/vehicle-allocation/domain/vehicle-allocation.repository'
import { IUseCase } from '@/core/shared/application/use-case.interface'

export class DeleteVehicleAllocationUseCase
  implements
    IUseCase<DeleteVehicleAllocationInput, DeleteVehicleAllocationOutput>
{
  constructor(private vehicleRepo: IVehicleAllocationRepository) {}

  async execute(
    input: DeleteVehicleAllocationInput,
  ): Promise<DeleteVehicleAllocationOutput> {
    const vehicleId = new VehicleAllocationId(input.id)
    await this.vehicleRepo.delete(vehicleId)
  }
}

export type DeleteVehicleAllocationInput = {
  id: string
}

type DeleteVehicleAllocationOutput = void

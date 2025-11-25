import { VehicleAllocationInMemoryRepository } from '@/core/vehicle-allocation/infra/db/in-memory/vehicle-allocation-in-memory.repository'
import { UpdateVehicleAllocationUseCase } from './update-vehicle-allocation.use-case'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
import { validUuid, validUuid_2, validUuid_3 } from '@/shared/tests/constants'
import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'

describe('UpdateVehicleAllocationUseCase Unit Tests', () => {
  let useCase: UpdateVehicleAllocationUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeEach(() => {
    repository = new VehicleAllocationInMemoryRepository()
    useCase = new UpdateVehicleAllocationUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() =>
      useCase.execute({
        id: validUuid,
        driver_id: validUuid_2,
        vehicle_id: validUuid_3,
        reason: 'fake',
        start_date: new Date(new Date().getTime() - 1000),
        end_date: new Date(new Date().getTime() + 1000),
      }),
    ).rejects.toThrow(new InvalidUuidError())

    const allocationId = new VehicleAllocationId()

    await expect(() =>
      useCase.execute({
        id: allocationId.value,
        driver_id: validUuid_2,
        vehicle_id: validUuid,
        reason: 'fake',
        start_date: new Date(new Date().getTime() - 1000),
        end_date: new Date(new Date().getTime() + 1000),
      }),
    ).rejects.toThrow(new NotFoundError(allocationId.value, VehicleAllocation))
  })

  it('should throw an error when aggregate is not valid', async () => {
    const aggregate = new VehicleAllocation({
      allocation_id: new VehicleAllocationId(validUuid),
      driver_id: new DriverId(validUuid_2),
      vehicle_id: new VehicleId(validUuid_3),
      reason: 'fake',
      start_date: new Date(new Date().getTime() - 1000),
      end_date: new Date(new Date().getTime() + 1000),
    })
    repository.items = [aggregate]
    await expect(() =>
      useCase.execute({
        id: validUuid,
        driver_id: validUuid_2,
        vehicle_id: validUuid_3,
        reason: 'f'.repeat(256),
        start_date: new Date(new Date().getTime() - 1000),
        end_date: new Date(new Date().getTime() + 1000),
      }),
    ).rejects.toThrow('Entity Validation Error')
  })

  it('should update a vehicle', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const entity = new VehicleAllocation({
      allocation_id: new VehicleAllocationId(validUuid),
      driver_id: new DriverId(validUuid_2),
      vehicle_id: new VehicleId(validUuid_3),
      reason: 'f'.repeat(256),
      start_date: new Date(new Date().getTime() - 1000),
      end_date: new Date(new Date().getTime() + 1000),
    })
    repository.items = [entity]

    let output = await useCase.execute({
      id: entity.vehicle_id.value,
      driver_id: validUuid_2,
      vehicle_id: validUuid_3,
      reason: 'feito',
      start_date: new Date(new Date().getTime() - 100000),
      end_date: new Date(new Date().getTime() + 100000),
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      driver_id: validUuid_2,
      vehicle_id: validUuid_3,
      reason: 'feito',
      start_date: new Date(new Date().getTime() - 100000),
      end_date: new Date(new Date().getTime() + 100000),
    })

    const start_date = new Date()

    type Arrange = {
      input: {
        id: string
        driver_id: string
        vehicle_id: string
        reason: string
        start_date: Date
        end_date?: Date
      }
      expected: {
        id: string
        driver_id: string
        vehicle_id: string
        reason: string
        start_date: Date
        end_date: Date | null
        created_at: Date
        updated_at: Date
      }
    }
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.vehicle_id.value,
          driver_id: validUuid,
          vehicle_id: validUuid_2,
          reason: 'reason',
          start_date,
        },
        expected: {
          id: entity.vehicle_id.value,
          driver_id: validUuid,
          vehicle_id: validUuid_2,
          reason: 'reason',
          start_date,
          created_at: start_date,
          end_date: null,
          updated_at: start_date,
        },
      },
    ]

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        driver_id: i.input.driver_id,
        end_date: i.input.end_date as any,
        start_date: i.input.start_date,
        reason: i.input.reason,
        vehicle_id: i.input.vehicle_id,
      })
      expect(output).toStrictEqual({
        id: entity.vehicle_id.value,
        vehicle_id: i.expected.vehicle_id,
        driver_id: i.expected.driver_id,
        start_date: i.expected.start_date,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      })
    }
  })
})

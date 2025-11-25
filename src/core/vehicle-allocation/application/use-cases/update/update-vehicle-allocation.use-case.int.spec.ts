import { VehicleAllocationPrismaRepository } from '@/core/vehicle-allocation/infra/db/prisma/vehicle-allocation-prisma.repository'
import { UpdateVehicleAllocationUseCase } from './update-vehicle-allocation.use-case'
import { setupPrisma } from '@/core/shared/infra/testing/helpers'
import {
  VehicleAllocation,
  VehicleAllocationId,
} from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
import { validUuid, validUuid_2, validUuid_3 } from '@/shared/tests/constants'

describe('UpdateVehicleAllocationUseCase Integration Tests', () => {
  let useCase: UpdateVehicleAllocationUseCase
  let repository: VehicleAllocationPrismaRepository
  const prismaService = setupPrisma()

  beforeEach(() => {
    repository = new VehicleAllocationPrismaRepository(prismaService.prisma)
    useCase = new UpdateVehicleAllocationUseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    const categoryId = new VehicleAllocationId()
    await expect(() =>
      useCase.execute({
        id: validUuid,
        driver_id: validUuid_2,
        vehicle_id: validUuid_3,
        reason: 'fake',
        start_date: new Date(new Date().getTime() - 1000),
        end_date: new Date(new Date().getTime() + 1000),
      }),
    ).rejects.toThrow(new NotFoundError(categoryId.value, VehicleAllocation))
  })

  it('should update a category', async () => {
    const entity = VehicleAllocation.fake().aVehicleAllocation().build()
    repository.insert(entity)

    let output = await useCase.execute({
      id: entity.vehicle_id.value,
      driver_id: validUuid_2,
      vehicle_id: validUuid_3,
      reason: 'fake edit',
      start_date: new Date(new Date().getTime() - 1000),
      end_date: new Date(new Date().getTime() + 1000),
    })
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      driver_id: validUuid_2,
      vehicle_id: validUuid_3,
      reason: 'fake edit',
      start_date: entity.start_date,
      end_date: entity.end_date,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    type Arrange = {
      input: {
        id: string
        driver_id: string
        vehicle_id: string
        reason: string
        start_date: Date
        end_date: Date
      }
      expected: {
        id: string
        driver_id: string
        vehicle_id: string
        reason: string
        start_date: Date
        end_date?: Date
        created_at?: Date
        updated_at?: Date
      }
    }
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.vehicle_id.value,
          driver_id: validUuid_2,
          vehicle_id: validUuid_3,
          reason: 'fake edit',
          start_date: new Date(new Date().getTime() - 1000),
          end_date: new Date(new Date().getTime() + 1000),
        },
        expected: {
          id: entity.vehicle_id.value,
          reason: 'fake',
          start_date: entity.start_date,
          end_date: entity.end_date,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
          driver_id: entity.driver_id.value,
          vehicle_id: entity.vehicle_id.value,
        } as any,
      },
    ]

    for (const i of arrange) {
      output = await useCase.execute({
        id: entity.vehicle_id.value,
        driver_id: validUuid_2,
        vehicle_id: validUuid_3,
        reason: 'fake edit',
        start_date: new Date(new Date().getTime() - 1000),
        end_date: new Date(new Date().getTime() + 1000),
      })
      const entityUpdated = await repository.findById(
        new VehicleAllocationId(i.input.id),
      )
      expect(output).toStrictEqual({
        id: entity.vehicle_id.value,
        driver_id: i.expected.driver_id,
        vehicle_id: i.expected.vehicle_id,
        reason: i.expected.reason,
        start_date: entityUpdated!.start_date,
        end_date: entityUpdated!.end_date,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
      expect(entityUpdated!.toJSON()).toStrictEqual({
        id: entity.vehicle_id.value,
        driver_id: i.expected.driver_id,
        vehicle_id: i.expected.vehicle_id,
        reason: i.expected.reason,
        start_date: entityUpdated!.start_date,
        end_date: entityUpdated!.end_date,
        created_at: entityUpdated!.created_at,
        updated_at: entityUpdated!.updated_at,
      })
    }
  })
})

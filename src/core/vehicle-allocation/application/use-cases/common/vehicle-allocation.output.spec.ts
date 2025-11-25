import { validUuid, validUuid_2 } from '@/shared/tests/constants'
import { VehicleAllocation } from '../../../domain/vehicle-allocation.aggregate'
import { VehicleAllocationOutputMapper } from './vehicle-allocation.output'
import { DriverId } from '@/core/driver/domain/driver.aggregate'
import { VehicleId } from '@/core/vehicle/domain/vehicle.aggregate'

describe('VehicleAllocationAllocationOutputMapper Unit Tests', () => {
  it('should convert a vehicle in output', () => {
    const entity = VehicleAllocation.create({
      driver_id: new DriverId(validUuid),
      vehicle_id: new VehicleId(validUuid_2),
      reason: 'reason',
      start_date: new Date(),
    })
    const spyToJSON = jest.spyOn(entity, 'toJSON')
    const output = VehicleAllocationOutputMapper.toOutput(entity)
    expect(spyToJSON).toHaveBeenCalled()
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      driver_id: entity.driver_id,
      vehicle_id: entity.vehicle_id,
      reason: 'reason',
      start_date: entity.start_date,
      end_date: entity.end_date,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })
  })
})

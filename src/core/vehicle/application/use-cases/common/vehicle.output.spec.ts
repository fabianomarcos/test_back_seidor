import { Vehicle } from '../../../domain/vehicle.aggregate'
import { VehicleOutputMapper } from './vehicle.output'

describe('VehicleOutputMapper Unit Tests', () => {
  it('should convert a vehicle in output', () => {
    const entity = Vehicle.create({
      brand: 'Palio',
      color: 'Verde',
      plate: 'hgg-5555',
    })
    const spyToJSON = jest.spyOn(entity, 'toJSON')
    const output = VehicleOutputMapper.toOutput(entity)
    expect(spyToJSON).toHaveBeenCalled()
    expect(output).toStrictEqual({
      id: entity.vehicle_id.value,
      brand: 'Palio',
      color: 'Verde',
      plate: 'hgg-5555',
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })
  })
})

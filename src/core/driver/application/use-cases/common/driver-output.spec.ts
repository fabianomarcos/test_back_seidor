import { Driver } from '@/core/driver/domain/driver.aggregate'
import { DriverOutputMapper } from './driver-output'

describe('DriverOutputMapper Unit test', () => {
  it('should convert a driver in output', () => {
    const entity = Driver.create({ name: 'Jon Doe' })
    const spyToJSON = jest.spyOn(entity, 'toJSON')
    const output = DriverOutputMapper.toOutput(entity)
    expect(spyToJSON).toHaveBeenCalled()
    expect(output).toStrictEqual({
      id: entity.driver_id.value,
      name: 'Jon Doe',
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })
  })
})

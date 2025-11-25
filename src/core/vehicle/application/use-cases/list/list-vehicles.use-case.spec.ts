import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'
import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { ListVehiclesUseCase } from '@/core/vehicle/application/use-cases/list/list-vehicles.use-case'
import { VehicleOutputMapper } from '../common/vehicle.output'

describe('GetVehicleUseCase Unit Tests', () => {
  let usecase: ListVehiclesUseCase
  let repository: VehicleInMemoryRepository

  beforeEach(async () => {
    repository = new VehicleInMemoryRepository()
    usecase = new ListVehiclesUseCase(repository)
  })

  it('should list all vehicles sorted by created_at when input param is empty', async () => {
    const vehicles = Vehicle.fake()
      .theVehicles(4)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build()

    await repository.bulkInsert(vehicles)
    const spySearch = jest.spyOn(repository, 'search')
    const output = await usecase.execute({})
    expect(spySearch).toHaveBeenCalledWith({
      _filter: null,
      _page: 1,
      _per_page: 15,
      _sort: null,
      _sort_dir: null,
    })
    expect(output).toStrictEqual({
      items: [...vehicles].reverse().map(VehicleOutputMapper.toOutput),
      total: 4,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  })

  it('should be return output using pagination, sort and filter', async () => {
    const vehicles = [
      Vehicle.fake().aVehicle().withBrand('aaa'),
      Vehicle.fake().aVehicle().withBrand('AAA'),
      Vehicle.fake().aVehicle().withBrand('AAa'),
      Vehicle.fake().aVehicle().withBrand('bbb'),
      Vehicle.fake().aVehicle().withBrand('ccc'),
    ] as unknown as Vehicle[]

    await repository.bulkInsert(vehicles)

    let output = await usecase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: { brand: 'a' },
    })

    const orderedVehicles = [vehicles[1], vehicles[2]] as Vehicle[]

    expect(output).toStrictEqual({
      items: orderedVehicles.map(VehicleOutputMapper.toOutput),
      total: 3,
      page: 1,
      per_page: 2,
      last_page: 2,
    })

    output = await usecase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: { brand: 'a' },
    })

    const orderedVehiclesWithTwoPerPage = [vehicles[0]] as Vehicle[]

    expect(output).toStrictEqual({
      items: orderedVehiclesWithTwoPerPage.map(VehicleOutputMapper.toOutput),
      total: 3,
      page: 2,
      per_page: 2,
      last_page: 2,
    })

    output = await usecase.execute({
      page: 1,
      per_page: 15,
      sort: 'name',
      filter: { brand: 'a' },
    })

    const orderedVehiclesWithTwoPerPageAndAFilter = [
      vehicles[1],
      vehicles[2],
      vehicles[0],
    ] as Vehicle[]

    expect(output).toStrictEqual({
      items: orderedVehiclesWithTwoPerPageAndAFilter.map(
        VehicleOutputMapper.toOutput,
      ),
      total: 3,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  })
})

import { ListVehiclesUseCase } from '@/core/vehicle/application/use-cases/list/list-vehicles.use-case'
import { Vehicle } from '@/core/vehicle/domain/vehicle.aggregate'
import { VehicleInMemoryRepository } from '@/core/vehicle/infra/db/in-memory/vehicle-in-memory.repository'
import { VehicleOutputMapper } from '../common/vehicle.output'

describe('GetVehicleUseCase Unit Tests', () => {
  let usecase: ListVehiclesUseCase
  let repository: VehicleInMemoryRepository

  const vehicles = [
    Vehicle.fake().aVehicle().withBrand('aaa'),
    Vehicle.fake().aVehicle().withBrand('AAA'),
    Vehicle.fake().aVehicle().withBrand('AAa'),
    Vehicle.fake().aVehicle().withBrand('bbb'),
    Vehicle.fake().aVehicle().withBrand('ccc'),
  ] as unknown as Vehicle[]

  beforeEach(async () => {
    repository = new VehicleInMemoryRepository()
    usecase = new ListVehiclesUseCase(repository)
  })

  it('should list all vehicles sorted by created at when input param is empty', async () => {
    const vehicles = Vehicle.fake()
      .theVehicles(4)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build()

    await repository.bulkInsert(vehicles)
    const output = await usecase.execute({})

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
      filter: { color: 'a' },
    })

    const orderedVehicles = [vehicles[1], vehicles[2]] as Vehicle[]
    console.log('orderedVehicles: ', orderedVehicles)

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
      filter: { color: 'a' },
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
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: { color: 'a' },
    })

    const orderedVehiclesWithTwoPerPageAndAFilter = [vehicles[0]] as Vehicle[]

    expect(output).toStrictEqual({
      items: orderedVehiclesWithTwoPerPageAndAFilter.map(
        VehicleOutputMapper.toOutput,
      ),
      total: 3,
      page: 2,
      per_page: 2,
      last_page: 2,
    })
  })

  it('should be return an NotFoundError', async () => {
    await repository.bulkInsert(vehicles)

    const output = await usecase.execute({ filter: { color: 'z' } })

    expect(output).toStrictEqual({
      items: [],
      total: 0,
      page: 1,
      per_page: 15,
      last_page: 0,
    })
  })
})

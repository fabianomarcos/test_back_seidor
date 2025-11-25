import { Driver } from '@/core/driver/domain/driver.aggregate'
import { DriverInMemoryRepository } from '@/core/driver/infra/db/in-memory/driver-in-memory.repository'
import { ListDriverUseCase } from './list-drivers.use-case'
import { DriverOutputMapper } from '../common/driver-output'

describe('GetDriverUseCase Unit Tests', () => {
  let usecase: ListDriverUseCase
  let repository: DriverInMemoryRepository

  beforeEach(async () => {
    repository = new DriverInMemoryRepository()
    usecase = new ListDriverUseCase(repository)
  })

  it('should list all drivers sorted by created_at when input param is empty', async () => {
    const drivers = Driver.fake()
      .theDrivers(4)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build()

    await repository.bulkInsert(drivers)
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
      items: [...drivers].reverse().map(DriverOutputMapper.toOutput),
      total: 4,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  })

  it('should be return output using pagination, sort and filter', async () => {
    const drivers = [
      new Driver({ name: 'a' }),
      new Driver({ name: 'AA' }),
      new Driver({ name: 'Aa' }),
      new Driver({ name: 'b' }),
      new Driver({ name: 'c' }),
    ]
    await repository.bulkInsert(drivers)

    let output = await usecase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    })

    const orderedDrivers = [drivers[1], drivers[2]] as Driver[]

    expect(output).toStrictEqual({
      items: orderedDrivers.map(DriverOutputMapper.toOutput),
      total: 3,
      page: 1,
      per_page: 2,
      last_page: 2,
    })

    output = await usecase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    })

    const orderedDriversWithTwoPerPage = [drivers[0]] as Driver[]

    expect(output).toStrictEqual({
      items: orderedDriversWithTwoPerPage.map(DriverOutputMapper.toOutput),
      total: 3,
      page: 2,
      per_page: 2,
      last_page: 2,
    })

    output = await usecase.execute({
      page: 1,
      per_page: 15,
      sort: 'name',
      filter: 'a',
    })

    const orderedDriversWithTwoPerPageAndAFilter = [
      drivers[1],
      drivers[2],
      drivers[0],
    ] as Driver[]

    expect(output).toStrictEqual({
      items: orderedDriversWithTwoPerPageAndAFilter.map(
        DriverOutputMapper.toOutput,
      ),
      total: 3,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  })
})

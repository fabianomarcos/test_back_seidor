import { Driver } from '@/core/driver/domain/driver.aggregate'
import { DriverInMemoryRepository } from '@/core/driver/infra/db/in-memory/driver-in-memory.repository'
import { ListDriversUseCase } from './list-drivers.use-case'
import { DriverOutputMapper } from '../common/driver-output'

describe('GetDriverUseCase Unit Tests', () => {
  let usecase: ListDriversUseCase
  let repository: DriverInMemoryRepository

  beforeEach(async () => {
    repository = new DriverInMemoryRepository()
    usecase = new ListDriversUseCase(repository)
  })

  it('should list all drivers sorted by created at when input param is empty', async () => {
    const drivers = Driver.fake()
      .theDrivers(4)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build()

    await repository.bulkInsert(drivers)
    const output = await usecase.execute({})

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
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    })

    const orderedDriversWithTwoPerPageAndAFilter = [drivers[0]] as Driver[]

    expect(output).toStrictEqual({
      items: orderedDriversWithTwoPerPageAndAFilter.map(
        DriverOutputMapper.toOutput,
      ),
      total: 3,
      page: 2,
      per_page: 2,
      last_page: 2,
    })
  })

  it('should be return an NotFoundError', async () => {
    const drivers = [
      new Driver({ name: 'a' }),
      new Driver({ name: 'AA' }),
      new Driver({ name: 'Aa' }),
      new Driver({ name: 'b' }),
      new Driver({ name: 'c' }),
    ]
    await repository.bulkInsert(drivers)

    const output = await usecase.execute({ filter: 'z' })

    expect(output).toStrictEqual({
      items: [],
      total: 0,
      page: 1,
      per_page: 15,
      last_page: 0,
    })
  })
})

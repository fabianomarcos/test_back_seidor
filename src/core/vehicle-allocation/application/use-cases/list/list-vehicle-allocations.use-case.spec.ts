import { VehicleAllocation } from '@/core/vehicle-allocation/domain/vehicle-allocation.aggregate'
import { VehicleAllocationInMemoryRepository } from '@/core/vehicle-allocation/infra/db/in-memory/vehicle-allocation-in-memory.repository'
import { ListVehicleAllocationsUseCase } from '@/core/vehicle-allocation/application/use-cases/list/list-vehicle-allocations.use-case'
import { VehicleAllocationOutputMapper } from '../common/vehicle-allocation.output'

describe('GetVehicleAllocationUseCase Unit Tests', () => {
  let usecase: ListVehicleAllocationsUseCase
  let repository: VehicleAllocationInMemoryRepository

  beforeEach(async () => {
    repository = new VehicleAllocationInMemoryRepository()
    usecase = new ListVehicleAllocationsUseCase(repository)
  })

  it('should list all vehicles sorted by created_at when input param is empty', async () => {
    const vehicles = VehicleAllocation.fake()
      .theVehicleAllocations(4)
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
      items: [...vehicles]
        .reverse()
        .map(VehicleAllocationOutputMapper.toOutput),
      total: 4,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  })

  /* it('should be return output using pagination, sort and filter', async () => {
    const vehicles = [
      VehicleAllocation.fake().aVehicleAllocation().withReason('aaa'),
      VehicleAllocation.fake().aVehicleAllocation().withReason('AAA'),
      VehicleAllocation.fake().aVehicleAllocation().withReason('AAa'),
      VehicleAllocation.fake().aVehicleAllocation().withReason('bbb'),
      VehicleAllocation.fake().aVehicleAllocation().withReason('ccc'),
    ] as unknown as VehicleAllocation[]

    await repository.bulkInsert(vehicles)

    let output = await usecase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: { : 'a' },
    })

    const orderedVehicleAllocations = [
      vehicles[1],
      vehicles[2],
    ] as VehicleAllocation[]

    expect(output).toStrictEqual({
      items: orderedVehicleAllocations.map(
        VehicleAllocationOutputMapper.toOutput,
      ),
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

    const orderedVehicleAllocationsWithTwoPerPage = [
      vehicles[0],
    ] as VehicleAllocation[]

    expect(output).toStrictEqual({
      items: orderedVehicleAllocationsWithTwoPerPage.map(
        VehicleAllocationOutputMapper.toOutput,
      ),
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

    const orderedVehicleAllocationsWithTwoPerPageAndAFilter = [
      vehicles[1],
      vehicles[2],
      vehicles[0],
    ] as VehicleAllocation[]

    expect(output).toStrictEqual({
      items: orderedVehicleAllocationsWithTwoPerPageAndAFilter.map(
        VehicleAllocationOutputMapper.toOutput,
      ),
      total: 3,
      page: 1,
      per_page: 15,
      last_page: 1,
    })
  }) */
})

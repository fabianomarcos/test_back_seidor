import { Router } from 'express'

import { CreateVehicleAllocationController } from '@/core/vehicle-allocation/infra/http/controllers/create/create-vehicle-allocation.controller'
import { CreateVehicleAllocationUseCase } from '@/core/vehicle-allocation/application/use-cases/create/create-vehicle-allocation.use-case'
import { VehicleAllocationPrismaRepository } from '@/core/vehicle-allocation/infra/db/prisma/vehicle-allocation-prisma.repository'
import { PrismaService } from '@/core/shared/infra/db/prisma/prisma.service'
import { SearchVehicleAllocationController } from '@/core/vehicle-allocation/infra/http/controllers/search/search-vehicle-allocation.controller'
import { ListVehicleAllocationsUseCase } from '@/core/vehicle-allocation/application/use-cases/list/list-vehicle-allocations.use-case'
import { GetVehicleAllocationByIdUseCase } from '@/core/vehicle-allocation/application/use-cases/get-by-id/get-vehicle-allocation-by-id.use-case'
import { GetByIdVehicleAllocationController } from '@/core/vehicle-allocation/infra/http/controllers/get-by-id/get-by-id-vehicle-allocation.controller'
import { DeleteVehicleAllocationController } from '@/core/vehicle-allocation/infra/http/controllers/delete/delete-vehicle-allocation.controller'
import { DeleteVehicleAllocationUseCase } from '@/core/vehicle-allocation/application/use-cases/delete/delete-vehicle-allocation.use-case'
import { UpdateVehicleAllocationController } from '@/core/vehicle-allocation/infra/http/controllers/update/update-vehicle-allocation.controller'
import { UpdateVehicleAllocationUseCase } from '@/core/vehicle-allocation/application/use-cases/update/update-vehicle-allocation.use-case'

export const allocationRoutes = Router()

const prisma = PrismaService.getInstance()
const allocationRepository = new VehicleAllocationPrismaRepository(prisma)

const createUsecase = new CreateVehicleAllocationUseCase(allocationRepository)
const listUsecase = new ListVehicleAllocationsUseCase(allocationRepository)
const getByIdUsecase = new GetVehicleAllocationByIdUseCase(allocationRepository)
const deleteUsecase = new DeleteVehicleAllocationUseCase(allocationRepository)
const updateUsecase = new UpdateVehicleAllocationUseCase(allocationRepository)

const createAllocationController = new CreateVehicleAllocationController(
  createUsecase,
)
const searchAllocationController = new SearchVehicleAllocationController(
  listUsecase,
)
const getByIdAllocationController = new GetByIdVehicleAllocationController(
  getByIdUsecase,
)
const deleteAllocationController = new DeleteVehicleAllocationController(
  deleteUsecase,
)
const updateAllocationController = new UpdateVehicleAllocationController(
  updateUsecase,
)

allocationRoutes.post('/', createAllocationController.create)
allocationRoutes.get('/', searchAllocationController.search)
allocationRoutes.get('/:id', getByIdAllocationController.find)
allocationRoutes.delete('/:id', deleteAllocationController.delete)
allocationRoutes.patch('/:id', updateAllocationController.update)

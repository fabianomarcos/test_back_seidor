import { Router } from 'express'

import { CreateVehicleController } from '@/core/vehicle/infra/http/controllers/create/create-vehicle.controller'
import { CreateVehicleUseCase } from '@/core/vehicle/application/use-cases/create/create-vehicle.use-case'
import { VehiclePrismaRepository } from '@/core/vehicle/infra/db/prisma/vehicle-prisma.repository'
import { PrismaService } from '@/core/shared/infra/db/prisma/prisma.service'
import { SearchVehicleController } from '@/core/vehicle/infra/http/controllers/search/search-vehicle.controller'
import { ListVehiclesUseCase } from '@/core/vehicle/application/use-cases/list/list-vehicles.use-case'
import { GetVehicleByIdUseCase } from '@/core/vehicle/application/use-cases/get-by-id/get-vehicle-by-id.use-case'
import { GetByIdVehicleController } from '@/core/vehicle/infra/http/controllers/get-by-id/get-by-id-vehicle.controller'
import { DeleteVehicleController } from '@/core/vehicle/infra/http/controllers/delete/delete-vehicle.controller'
import { DeleteVehicleUseCase } from '@/core/vehicle/application/use-cases/delete/delete-vehicle.use-case'
import { UpdateVehicleController } from '@/core/vehicle/infra/http/controllers/update/update-vehicle.controller'
import { UpdateVehicleUseCase } from '@/core/vehicle/application/use-cases/update/update-vehicle.use-case'

export const vehicleRoutes = Router()

const prisma = PrismaService.getInstance()
const vehicleRepository = new VehiclePrismaRepository(prisma)

const createUsecase = new CreateVehicleUseCase(vehicleRepository)
const listUsecase = new ListVehiclesUseCase(vehicleRepository)
const getByIdUsecase = new GetVehicleByIdUseCase(vehicleRepository)
const deleteUsecase = new DeleteVehicleUseCase(vehicleRepository)
const updateUsecase = new UpdateVehicleUseCase(vehicleRepository)

const createVehicleController = new CreateVehicleController(createUsecase)
const searchVehicleController = new SearchVehicleController(listUsecase)
const getByIdVehicleController = new GetByIdVehicleController(getByIdUsecase)
const deleteVehicleController = new DeleteVehicleController(deleteUsecase)
const updateVehicleController = new UpdateVehicleController(updateUsecase)

vehicleRoutes.post('/', createVehicleController.create)
vehicleRoutes.get('/', searchVehicleController.search)
vehicleRoutes.get('/:id', getByIdVehicleController.find)
vehicleRoutes.delete('/:id', deleteVehicleController.delete)
vehicleRoutes.patch('/:id', updateVehicleController.update)

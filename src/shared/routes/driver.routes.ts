import { Router } from 'express'

import { CreateDriverController } from '@/core/driver/infra/http/controllers/create/create-driver.controller'
import { CreateDriverUseCase } from '@/core/driver/application/use-cases/create/create-driver.use-case'
import { DriverPrismaRepository } from '@/core/driver/infra/db/prisma/driver-prisma.repository'
import { PrismaService } from '@/core/shared/infra/db/prisma/prisma.service'
import { SearchDriverController } from '@/core/driver/infra/http/controllers/search/search-driver.controller'
import { ListDriverUseCase } from '@/core/driver/application/use-cases/list/list-drivers.use-case'
import { GetDriverByIdUseCase } from '@/core/driver/application/use-cases/get-by-id/get-driver-by-id.use-case'
import { GetByIdDriverController } from '@/core/driver/infra/http/controllers/get-by-id/get-by-id-driver.controller'
import { DeleteDriverController } from '@/core/driver/infra/http/controllers/delete/delete-driver.controller'
import { DeleteDriverUseCase } from '@/core/driver/application/use-cases/delete/delete-driver.use-case'
import { UpdateDriverController } from '@/core/driver/infra/http/controllers/update/update-driver.controller'
import { UpdateDriverUseCase } from '@/core/driver/application/use-cases/update/update-driver.use-case'

export const driverRoutes = Router()

const prisma = PrismaService.getInstance()
const driverRepository = new DriverPrismaRepository(prisma)

const createUsecase = new CreateDriverUseCase(driverRepository)
const listUsecase = new ListDriverUseCase(driverRepository)
const getByIdUsecase = new GetDriverByIdUseCase(driverRepository)
const deleteUsecase = new DeleteDriverUseCase(driverRepository)
const updateUsecase = new UpdateDriverUseCase(driverRepository)

const createDriveController = new CreateDriverController(createUsecase)
const searchDriveController = new SearchDriverController(listUsecase)
const getByIdDriveController = new GetByIdDriverController(getByIdUsecase)
const deleteDriveController = new DeleteDriverController(deleteUsecase)
const updateDriveController = new UpdateDriverController(updateUsecase)

driverRoutes.post('/', createDriveController.create)
driverRoutes.get('/', searchDriveController.search)
driverRoutes.get('/:id', getByIdDriveController.find)
driverRoutes.delete('/:id', deleteDriveController.delete)
driverRoutes.patch('/:id', updateDriveController.update)

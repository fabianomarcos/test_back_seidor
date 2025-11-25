import { Router } from 'express'
import { driverRoutes } from './driver.routes'
import { vehicleRoutes } from './vehicle.routes'
import { allocationRoutes } from './vehicle-allocations.routes'

const routes = Router()

routes.use('/drivers', driverRoutes)
routes.use('/vehicles', vehicleRoutes)
routes.use('/vehicle-allocations', allocationRoutes)

export default routes

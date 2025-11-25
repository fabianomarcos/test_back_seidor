import { Router } from 'express'
import { driverRoutes } from './driver.routes'
import { vehicleRoutes } from './vehicle.routes'

const routes = Router()

routes.use('/drivers', driverRoutes)
routes.use('/vehicles', vehicleRoutes)

export default routes

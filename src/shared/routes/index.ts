import { Router } from 'express'
import { driverRoutes } from './driver.routes'

const routes = Router()

routes.use('/drivers', driverRoutes)

export default routes

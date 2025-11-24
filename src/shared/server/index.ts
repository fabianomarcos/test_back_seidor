import 'reflect-metadata'
import express from 'express'
import routes from '../routes'
import { environments } from '../../config/env'
import { errorHandler } from '../errors/error-handler'

const port = environments.PORT || 3000
const app = express()

app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)
app.listen(port, () => console.log(`🔥 Server is running on port ${port}`))

import { Router } from 'express'

import ExampleRouter from '@/routes/api/v1/public/example-route'

const publicRouter = Router()

// Example Router
publicRouter.use('/example', ExampleRouter)

// Export the Public Router
export default publicRouter

import { Router } from 'express'

import ApiController from '@/controllers/api/api.controller'
import PubicRouter from '@/routes/api/v1/public'

// Create an API v1 Router
const apiV1Router = Router()

// Welcome API
apiV1Router.get('/', ApiController.index)

// Public Router
apiV1Router.use('/', PubicRouter)

// Export the API v1 Router
export default apiV1Router

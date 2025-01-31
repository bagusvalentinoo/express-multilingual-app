import { Router } from 'express'

import PubicRouter from '@/routes/api/v1/public'

// Create a API v1 Router
const apiV1Router = Router()

// Public Router
apiV1Router.use('/', PubicRouter)

// Export the API v1 Router
export default apiV1Router

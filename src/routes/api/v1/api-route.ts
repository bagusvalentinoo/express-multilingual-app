import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'

import { response } from '@/utils/response'

// Create a API v1 router
const apiV1Router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
apiV1Router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  response(res, {
    statusCode: 200,
    message: 'Welcome to Express Multilingual App',
    data: null,
    errors: null
  })
})

// Export the API v1 router
export default apiV1Router

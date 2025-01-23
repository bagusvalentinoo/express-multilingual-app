import { Router } from 'express'

import { response } from '../../../utils/response.js'

// Create API V1 router
const apiV1Router = Router()

// Welcome route
// eslint-disable-next-line no-unused-vars
apiV1Router.get('/', (req, res, next) => {
  response(res, {
    statusCode: 200,
    message: 'Welcome to Express Multilingual APP',
    data: null,
    errors: null
  })
})

export default apiV1Router

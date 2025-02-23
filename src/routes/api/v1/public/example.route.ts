import { Router } from 'express'

import ExampleController from '@/controllers/api/public/example.controller'

// Create an Example Router
const exampleRouter = Router()

// Example Router
exampleRouter.get('/', ExampleController.index)

// Export the Example Router
export default exampleRouter
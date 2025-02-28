import { Router } from 'express'

import ExampleController from '@/controllers/api/public/example.controller'

// Create an Example Router
const exampleRouter = Router()

// GET /example
exampleRouter.get('/', ExampleController.index)

// POST /example
exampleRouter.post('/', ExampleController.store)

// GET /example/:id
exampleRouter.get('/:id', ExampleController.show)

// PUT /example/:id
exampleRouter.put('/:id', ExampleController.update)

// DELETE /example/
exampleRouter.delete('/', ExampleController.destroyBatch)

// Export the Example Router
export default exampleRouter
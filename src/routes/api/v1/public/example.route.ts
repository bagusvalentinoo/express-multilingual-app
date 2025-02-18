import { Router } from 'express'
import ExampleController from '@/controllers/api/public/example.controller'

const exampleRouter = Router()

exampleRouter.get('/', ExampleController.index)

export default exampleRouter
import express from 'express'

import { requestMiddleware } from '@/middlewares/request-middleware'
import { errorMiddleware } from '@/middlewares/error-middleware'
import apiV1Router from '@/routes/api/v1/api-route'

// Create an Express application
const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Middleware to log each incoming request
app.use(requestMiddleware)

// Routes
app.use('/api/v1', apiV1Router)

// Middleware to handle errors
app.use(errorMiddleware)

// Export the Express application
export default app

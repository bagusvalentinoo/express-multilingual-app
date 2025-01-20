import express from 'express'

import apiV1Router from './routes/api/v1/api-route.js'

import requestMiddleware from './middlewares/request-middleware.js'
import errorMiddleware from './middlewares/error-middleware.js'

// Create an Express application
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to log each request
app.use(requestMiddleware)

// Routes
app.use('/api/v1', apiV1Router)

// Middleware to handle errors
app.use(errorMiddleware)

// Export the Express application
export default app

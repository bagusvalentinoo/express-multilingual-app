import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import logger from './utils/logger.js'

import requestMiddleware from './middlewares/request-middleware.js'
import errorMiddleware from './middlewares/error-middleware.js'

// Create an Express application
const app = express()

// Get the port from environment variables
const PORT = Number(process.env.APP_PORT) || 8000

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to log each request
app.use(requestMiddleware)

// Middleware to handle errors
app.use(errorMiddleware)

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})

import express from 'express'
import { join } from 'path'

import { helmetConfig } from '@/config/security/helmet-config'
import i18next from '@/config/i18n/i18n-config'

import { requestMiddleware } from '@/middlewares/request-middleware'
import { errorMiddleware } from '@/middlewares/error-middleware'
import apiV1Router from '@/routes/api/v1/api-route'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const middleware = require('i18next-http-middleware')

// Create an Express application
const app = express()

// Middleware to serve static files
app.use(express.static(join('./public')))

// Middleware to set security headers
app.use(helmetConfig())

// Middleware to parse JSON requests
app.use(express.json())

// Middleware to handle i18next localization multilingual
app.use(middleware.handle(i18next))

// Middleware to log each incoming request
app.use(requestMiddleware)

// Routes
app.use('/api/v1', apiV1Router)

// Middleware to handle errors
app.use(errorMiddleware)

// Export the Express application
export default app

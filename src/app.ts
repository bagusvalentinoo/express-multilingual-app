import express from 'express'

import { morganMiddleware } from '@/lib/http/morgan'
import i18next from '@/lib/i18n/i18n'
import { corsConfig } from '@/lib/security/cors'
import { helmetConfig } from '@/lib/security/helmet'
import { apiLimiter } from '@/lib/security/rate-limiter'
import { errorMiddleware } from '@/middlewares/error.middleware'
import { localizationMiddleware } from '@/middlewares/localization.middleware'
import apiV1Router from '@/routes/api/v1/api.route'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const middleware = require('i18next-http-middleware')

// Create an Express application
const app = express()

// Middleware to serve static files
app.use(express.static('./public'))

// Middleware to log requests
app.use(morganMiddleware)

// Middleware to configure CORS
app.use(corsConfig())

// Middleware to set security headers
app.use(helmetConfig())

// Middleware to parse JSON requests
app.use(express.json())

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }))

// Middleware to handle i18next localization multilingual
app.use(middleware.handle(i18next))

// Middleware to limit API requests
app.use(apiLimiter)

// Middleware to handle localization
app.use(localizationMiddleware)

// Routes for API v1
app.use('/api/v1', apiV1Router)

// Middleware to handle errors
app.use(errorMiddleware)

// Export the Express application
export default app

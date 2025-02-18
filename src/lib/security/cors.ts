import type { RequestHandler } from 'express'
import cors from 'cors'
import { t } from 'i18next'

import {
  CORS_ORIGINS,
  CORS_ALLOWED_METHODS,
  CORS_ALLOWED_HEADERS
} from '@/constants/config/security.constant'

/**
 * Configures the CORS middleware for the application.
 *
 * @returns {RequestHandler} The CORS middleware.
 *
 * @example
 * ```typescript
 * app.use(corsConfig())
 * ```
 */
export const corsConfig = (): RequestHandler => {
  return cors({
    origin: (origin, callback) => {
      if (
        origin === null ||
        origin === undefined ||
        origin === '' ||
        (CORS_ORIGINS as readonly string[]).includes(origin) ||
        process.env.NODE_ENV === 'development'
      ) {
        callback(null, true)
      } else {
        callback(new Error(t('cors.not_allowed', { ns: 'configuration' })))
      }
    },
    methods: [...CORS_ALLOWED_METHODS],
    allowedHeaders: [...CORS_ALLOWED_HEADERS],
    credentials: true,
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
}

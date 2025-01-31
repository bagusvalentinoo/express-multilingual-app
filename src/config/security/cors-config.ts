import type { RequestHandler } from 'express'
import cors from 'cors'
import { t } from 'i18next'

import {
  CORS_ORIGINS,
  CORS_ALLOWED_METHODS,
  CORS_ALLOWED_HEADERS
} from '@/constant/config/security'

export const corsConfig = (): RequestHandler => {
  return cors({
    origin: (origin, callback) => {
      if (
        !origin ||
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

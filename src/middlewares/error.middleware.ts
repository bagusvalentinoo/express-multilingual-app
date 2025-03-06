import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { t } from '@/lib/i18n/i18n'
import { FormattedResponseError } from '@/utils/formatted-response-error.util'
import { logError } from '@/utils/logger.util'
import { responseError } from '@/utils/response.util'
import { customFormatZodError } from '@/utils/validation/zod.util'

// eslint-disable-next-line jsdoc/require-returns-check
/**
 * Handles errors and sends a formatted error response.
 *
 * @param {Error} error The error to be handled.
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} _next The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.use(errorMiddleware)
 * ```
 */
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let _statusCode = 500 // Default status code
  let _message = t('http.default', { ns: 'errors' }) // Default error message
  let _errors = null

  // Check if the error is an instance of FormattedResponseError
  if (error instanceof FormattedResponseError) {
    _statusCode = error.statusCode
    _message = error.message
  }

  // Check if the error is an instance of ZodError
  if (error instanceof ZodError) {
    _statusCode = 422
    _message = t('http.422', { ns: 'errors' })
    _errors = customFormatZodError(error.issues)
  }

  // Log the all error except ZodError validation error
  if (!(error instanceof ZodError))
    logError(error, {
      method: req.method,
      url: req.originalUrl
    })

  // Send a formatted error response
  responseError(res, {
    statusCode: _statusCode,
    message: _message,
    errors: _errors
  })
  return
}

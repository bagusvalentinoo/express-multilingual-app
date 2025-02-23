import type { NextFunction, Request, Response } from 'express'
import { t } from 'i18next'

import { FormattedResponseError } from '@/utils/formatted-response-error.util'
import { logError } from '@/utils/logger.util'
import { response } from '@/utils/response.util'

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

  // Check if the error is an instance of FormattedResponseError
  if (error instanceof FormattedResponseError) {
    _statusCode = error.statusCode
    _message = error.message
  }

  // Log the error
  logError(error, {
    method: req.method,
    url: req.originalUrl
  })

  // Send a formatted error response
  response(res, {
    statusCode: _statusCode,
    message: _message,
    data: null,
    errors: null
  })
  return
}

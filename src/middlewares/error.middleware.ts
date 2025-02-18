import type { NextFunction, Request, Response } from 'express'

import logger from '@/utils/logger.util'
import { FormattedResponseError } from '@/utils/formatted-response-error.util'
import { response } from '@/utils/response.util'

/**
 * Handles errors and sends a formatted error response.
 *
 * @param {Error} error The error to be handled.
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} _next The Express next middleware function.
 *
 * @returns A formatted error response.
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
  // Log the error
  logger.error(`Error occurred: ${error.message}`, {
    method: req.method,
    url: req.originalUrl,
    stack: error.stack
  })

  if (error instanceof FormattedResponseError) {
    return response(res, {
      statusCode: error.statusCode,
      message: error.message,
      data: null,
      errors: null
    })
  }

  return response(res, {
    statusCode: 500,
    message: error.message || 'Internal server error',
    data: null,
    errors: null
  })
}

import type { Request, Response, NextFunction } from 'express'

import logger from '@/utils/logger'
import { FormattedResponseError } from '@/utils/formatted-response-error'
import { response } from '@/utils/response'

/**
 * Handles errors and sends a formatted error response.
 * @function errorMiddleware
 * @param {Error} error - The error to be handled.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The Express next middleware function.
 */
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  // Log the error
  logger.error(`Error occurred: ${error.message}`, {
    method: req.method,
    url: req.originalUrl,
    stack: error.stack
  })

  // Send a formatted error response
  response(res, {
    statusCode: (error as FormattedResponseError).statusCode || 500,
    message: error.message || 'Internal server error',
    data: null,
    errors: null
  })
}

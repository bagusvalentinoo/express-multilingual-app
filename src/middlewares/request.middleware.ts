import type { Request, Response, NextFunction } from 'express'

import logger from '@/utils/logger.util'

/**
 * Middleware function to log incoming requests.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @example
 * ```typescript
 * app.use(requestMiddleware)
 * ```
 */
export const requestMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Log incoming request
    logger.info(`Incoming request: ${req.method} ${req.url}`)

    // Continue to the next middleware
    next()
  } catch (error) {
    // Log the error
    logger.error(error)

    // Pass the error to the next middleware
    next(error)
  }
}

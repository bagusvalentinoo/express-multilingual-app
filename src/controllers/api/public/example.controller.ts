import type { Request, Response, NextFunction } from 'express'
import { t } from 'i18next'

import { response } from '@/utils/response.util'
import logger from '@/utils/logger.util'

/**
 * Handles a GET request to /example
 * 
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.get('/example', exampleController.index)
 * ```
 */
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Send an example response
    response(res, {
      statusCode: 200,
      message: t('success', { ns: 'example' }),
      data: null,
      errors: null
    })
  } catch (error) {
    // Log the error
    logger.error(error)

    // Pass the error to the next middleware
    next(error)
  }
}

// Export the example controller
export default {
  index
}

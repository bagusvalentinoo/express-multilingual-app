import type { Request, Response, NextFunction } from 'express'
import { t } from 'i18next'

import { response } from '@/utils/response.util'

/**
 * Handles a GET request to welcome API /
 *
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.get('/', ApiController.index)
 * ```
 */
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Send an welcome response
    response(res, {
      statusCode: 200,
      message: t('welcome_success', { ns: 'common' }),
      data: null,
      errors: null
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

// Export the example controller
export default {
  index
}

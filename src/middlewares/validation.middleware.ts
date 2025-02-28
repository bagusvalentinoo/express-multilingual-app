import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'

/**
 * Validation middleware
 *
 * @param {ZodType} schema - The schema to validate the request body against
 *
 * @returns - The validation middleware
 *
 * @example
 * ```typescript
 * exampleRouter.post('/', validationMiddleware(CREATE_UPDATE), exampleController.createExample)
 * ```
 */
export const validationMiddleware = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body)

    if (error) next(error)

    next()
  }
}

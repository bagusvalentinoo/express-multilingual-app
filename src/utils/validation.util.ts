import type { ZodIssue, ZodType } from 'zod'

import type { CustomZodErrorResponse } from '@/types/error/zod.type'

/**
 * Validates data against a Zod schema
 *
 * @param {ZodType} schema - Zod schema to validate against
 * @param {T} data - Data to validate
 *
 * @returns {T} Validated data
 *
 * @throws {ZodError} When validation fails
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ name: z.string() })
 * const data = validate(userSchema, { name: 'John' })
 * ```
 */
export const validate = <T>(schema: ZodType, data: T): T => schema.parse(data)

/**
 * Custom format Zod error
 *
 * @param {ZodIssue[]} error - Zod error
 *
 * @returns {CustomZodErrorResponse[]} Custom Zod error response
 *
 * @example
 * ```typescript
 * const errors = customFormatZodError(error.issues as ZodIssue[])
 * ```
 */
export const customFormatZodError = (
  error: ZodIssue[]
): CustomZodErrorResponse[] =>
  error.map(issue => {
    return {
      field: issue.path.join('.'),
      message: issue.message
    }
  })

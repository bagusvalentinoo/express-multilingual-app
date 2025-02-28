import { t } from 'i18next'
import type { ZodType, ZodIssue } from 'zod'

import type { CustomZodErrorResponse } from '@/types/error/zod.type'
import { parseLocalizationString } from '@/utils/i18n/i18n.util'

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
    const { ns, key, params } = parseLocalizationString(issue.message)

    return {
      field: issue.path.join('.'),
      message: t(key, { ns, ...params })
    }
  })

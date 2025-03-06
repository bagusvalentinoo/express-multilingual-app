import { z, type ZodIssue, type ZodType } from 'zod'

import type { CustomZodErrorResponse } from '@/types/error/zod.type'
import {
  getInvalidTypeErrorMessage,
  getMinItemsErrorMessage,
  getRequiredErrorMessage
} from '@/utils/validation/validation-message.util'

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

/**
 * Required string validation
 *
 * @param {string} field - Field name
 *
 * @returns {ZodType} Zod type
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ name: requiredString('name') })
 * ```
 */
export const requiredString = (field: string): ZodType<string> =>
  z
    .string({
      required_error: getRequiredErrorMessage(field),
      invalid_type_error: getInvalidTypeErrorMessage(field)
    })
    .min(1, {
      message: getRequiredErrorMessage(field)
    })

/**
 * Required string array validation
 *
 * @param {string} field - Field name
 * @param {number} minItems - Minimum items
 *
 * @returns {ZodType} Zod type
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ names: requiredStringArray('names') })
 * ```
 */
export const requiredStringArray = (
  field: string,
  minItems: number = 1
): ZodType<string[]> =>
  z
    .array(requiredString(field), {
      required_error: getRequiredErrorMessage(field),
      invalid_type_error: getInvalidTypeErrorMessage(field)
    })
    .min(minItems, {
      message: getMinItemsErrorMessage(field, minItems)
    })

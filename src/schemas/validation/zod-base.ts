import { z, type ZodType } from 'zod'

import {
  getInvalidTypeErrorMessage,
  getMinItemsErrorMessage,
  getRequiredErrorMessage
} from '@/schemas/validation/messages'

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

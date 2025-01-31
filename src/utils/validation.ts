import { ZodType } from 'zod'

/**
 * Validate data against a Zod schema.
 * @param {ZodType} schema - The schema to validate against.
 * @param {*} data - The data to validate.
 * @returns {*} The validated data.
 */
export const validate = <T>(schema: ZodType, data: T): T => {
  return schema.parse(data)
}

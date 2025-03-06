import type { ZodType } from 'zod'

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

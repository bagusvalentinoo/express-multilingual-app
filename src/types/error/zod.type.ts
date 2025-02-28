/**
 * Custom Zod error response
 *
 * field: The field that caused the error
 * message: The error message
 */
export type CustomZodErrorResponse = {
  field: string
  message: string
}

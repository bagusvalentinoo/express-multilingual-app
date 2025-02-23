import type { HttpResponseFunction } from '@/types/http/response.type'

/**
 * Utility function to send standardized HTTP responses to clients.
 *
 * @param res - The Express Response object
 * @param options - Response configuration options
 *
 * @returns Express Response object
 *
 * @example
 * ```typescript
 * response(res, {
 *   statusCode: 200,
 *   message: 'Success',
 *   data: { id: 1, name: 'John' },
 *   errors: null
 * })
 * ```
 *
 * @example
 * ```typescript
 * response(res, {
 *   statusCode: 400,
 *   message: 'Bad Request',
 *   data: null,
 *   errors: { message: 'Invalid request' }
 * })
 * ```
 *
 * @example
 * ```typescript
 * response(res, {
 *   statusCode: 500,
 *   message: 'Internal Server Error',
 *   data: null,
 *   errors: { message: 'An unexpected error occurred' }
 * })
 * ```
 */
export const response: HttpResponseFunction = (res, options) =>
  res.status(options.statusCode).json({
    message: options.message,
    data: options.data,
    errors: options.errors
  })

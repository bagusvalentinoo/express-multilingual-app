import type {
  SuccessHttpResponseFunction,
  ErrorHttpResponseFunction
} from '@/types/http/response.type'

/**
 * Utility function to send a successful HTTP response to clients.
 *
 * @param res - The Express Response object
 * @param options - Response configuration options
 *
 * @returns Express Response object
 *
 * @example
 * ```typescript
 * responseSuccess(res, {
 *   statusCode: 200,
 *   message: 'Successfully fetched data',
 *   data: { id: 1, name: 'John' }
 * })
 * ```
 */
export const responseSuccess: SuccessHttpResponseFunction = (res, options) =>
  res.status(options.statusCode).json({
    status: 'success',
    message: options.message,
    data: options.data ?? null
  })

/**
 * Utility function to send an error HTTP response to clients.
 *
 * @param res - The Express Response object
 * @param options - Response configuration options
 *
 * @returns Express Response object
 *
 * @example
 * ```typescript
 * responseError(res, {
 *   statusCode: 400,
 *   message: 'Bad Request',
 *   errors: null
 * })
 * ```
 *
 * @example
 * ```typescript
 * responseError(res, {
 *   statusCode: 401,
 *   message: 'Unauthorized',
 *   errors: null
 * })
 * ```
 *
 * @example
 * ```typescript
 * responseError(res, {
 *   statusCode: 403,
 *   message: 'Forbidden',
 *   errors: null
 * })
 * ```
 *
 * @example
 * ```typescript
 * responseError(res, {
 *   statusCode: 422,
 *   message: 'Entity validation failed',
 *   errors: [
 *     { field: 'name', message: 'Name is required' },
 *     { field: 'email', message: 'Email is required' }
 *   ]
 * })
 * ```
 *
 * @example
 * ```typescript
 * responseError(res, {
 *   statusCode: 500,
 *   message: 'Internal Server Error',
 *   errors: null
 * })
 */
export const responseError: ErrorHttpResponseFunction = (res, options) =>
  res.status(options.statusCode).json({
    status: 'error',
    message: options.message,
    errors: options.errors ?? null
  })

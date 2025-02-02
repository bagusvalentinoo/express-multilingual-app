import type { Response } from 'express'

/**
 *
 *Response util function to send response to client
 * @template T - The type of response data.
 * @template K - The type of response errors.
 * @param {Response} res - The Express Response object.
 * @param {object} options - Options for the response.
 * @param {number} options.statusCode - The HTTP status code.
 * @param {string} options.message - The response message.
 * @param {T} options.data - The response data.
 * @param {K} options.errors - The response errors.
 * @returns {Response} - The Express Response object.
 */
export const response = <T, K>(
  res: Response,
  {
    statusCode,
    message,
    data,
    errors
  }: {
    statusCode: number
    message: string
    data: T
    errors: K
  }
): Response => {
  return res.status(statusCode).json({
    message,
    data,
    errors
  })
}

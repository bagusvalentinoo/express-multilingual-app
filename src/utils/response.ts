import type { Response } from 'express'

/**
 *
 * Response util function to send response to client
 *
 * @param {Response} res - Express Response
 * @param {Object} options - Options for response
 * @param {number} options.statusCode - HTTP status code
 * @param {string} options.message - Response message
 * @param {T} options.data - Response data
 * @param {K} options.errors - Response errors
 *
 * @returns {Response} - Express Response
 *
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

export const test = (n: number) => {
  if (n % 2 === 0) return true

  return false
}

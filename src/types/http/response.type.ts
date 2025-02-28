import type { Response } from 'express'

/**
 * Represents the options for an HTTP response.
 *
 * @template T - The type of the response data.
 * @template E - The type of the response errors.
 */
export type HttpResponseOptions<T, E> = {
  statusCode: number
  message: string
  data: T
  errors: E
}

/**
 * Represents a function that returns an HTTP response.
 *
 * @template T - The type of the response data.
 * @template E - The type of the response errors.
 */
export type HttpResponseFunction<T = unknown, E = unknown> = (
  res: Response,
  options: HttpResponseOptions<T, E>
) => Response

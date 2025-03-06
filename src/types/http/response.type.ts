import type { Response } from 'express'

/**
 * Represents the base options for an HTTP response.
 *
 * statusCode - The HTTP status code.
 * message - The message to send to the client.
 */
type BaseHttpResponseOptions = {
  statusCode: number
  message: string
}

/**
 * Represents a function that returns a successful HTTP response.
 *
 * res - The response object.
 * options - The options for the response.
 *
 * @template T - The type of the response data.
 */
export type SuccessHttpResponseFunction<T = unknown> = (
  res: Response,
  options: BaseHttpResponseOptions & { data: T }
) => Response

/**
 * Represents a function that returns an error HTTP response.
 *
 * res - The response object.
 * options - The options for the response.
 *
 * @template T - The type of the response data.
 */
export type ErrorHttpResponseFunction<T = unknown> = (
  res: Response,
  options: BaseHttpResponseOptions & { errors: T }
) => Response

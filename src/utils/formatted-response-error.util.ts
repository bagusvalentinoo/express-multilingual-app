/**
 * Class representing a formatted response error.
 *
 * @example
 * ```typescript
 * throw new FormattedResponseError(400, 'Oops, data not found')
 * ```
 */
export class FormattedResponseError extends Error {
  /**
   * Creates an instance of FormattedResponseError.
   *
   * @param statusCode - HTTP status code.
   * @param message - Error message.
   */
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

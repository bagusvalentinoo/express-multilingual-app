/**
 * Class representing a formatted response error.
 */
export class FormattedResponseError extends Error {
  /**
   * Creates an instance of FormattedResponseError.
   *
   * @param statusCode - HTTP status code of the error.
   * @param message - Error message.
   */
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

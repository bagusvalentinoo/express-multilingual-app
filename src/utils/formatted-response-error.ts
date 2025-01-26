/**
 * Class representing a formatted response error.
 *
 * @class FormattedResponseError
 * @extends {Error}
 */
export class FormattedResponseError extends Error {
  /**
   * Creates an instance of FormattedResponseError.
   *
   * @param {number} statusCode - HTTP status code of the error.
   * @param {string} message - Error message.
   */
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

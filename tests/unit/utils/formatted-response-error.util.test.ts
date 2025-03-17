import { describe, it, expect } from 'bun:test'

import { FormattedResponseError } from '../../../src/utils/formatted-response-error.util'

describe('FormattedResponseError', () => {
  it('should create an instance with the correct statusCode and message', () => {
    const statusCode = 400
    const message = 'Oops, data not found'
    const error = new FormattedResponseError(statusCode, message)

    expect(error.statusCode).toBe(statusCode)
    expect(error.message).toBe(message)
    expect(error).toBeInstanceOf(Error)
  })

  it('should create an instance with a default message if none is provided', () => {
    const statusCode = 500
    const error = new FormattedResponseError(statusCode, '')

    expect(error.statusCode).toBe(statusCode)
    expect(error.message).toBe('')
    expect(error).toBeInstanceOf(Error)
  })

  it('should handle non-standard status codes', () => {
    const statusCode = 299
    const message = 'Custom status code'
    const error = new FormattedResponseError(statusCode, message)

    expect(error.statusCode).toBe(statusCode)
    expect(error.message).toBe(message)
    expect(error).toBeInstanceOf(Error)
  })

  it('should handle very long error messages', () => {
    const statusCode = 404
    const message = 'A'.repeat(1000)
    const error = new FormattedResponseError(statusCode, message)

    expect(error.statusCode).toBe(statusCode)
    expect(error.message).toBe(message)
    expect(error).toBeInstanceOf(Error)
  })

  it('should handle negative status codes', () => {
    const statusCode = -1
    const message = 'Negative status code'
    const error = new FormattedResponseError(statusCode, message)

    expect(error.statusCode).toBe(statusCode)
    expect(error.message).toBe(message)
    expect(error).toBeInstanceOf(Error)
  })
})

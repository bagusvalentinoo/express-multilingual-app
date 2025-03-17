import { describe, it, expect, mock, beforeEach } from 'bun:test'
import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { errorMiddleware } from '../../../src/middlewares/error.middleware'
import { FormattedResponseError } from '../../../src/utils/formatted-response-error.util'

const mockLogger = {
  error: mock(() => {}),
  info: mock(() => {}),
  debug: mock(() => {}),
  warn: mock(() => {})
}

mock.module('../../../src/lib/logger/winston.ts', () => ({
  default: mockLogger
}))

interface MockResponse extends Response {
  statusCode: number
  body: {
    status: string
    message: string
    errors?: Array<{ field: string; message: string }> | null
  }
}

const createMockResponse = (): MockResponse =>
  ({
    statusCode: 200,
    body: { status: '', message: '', errors: null },
    status(code: number) {
      this.statusCode = code
      return this
    },
    json(data: MockResponse['body']) {
      this.body = data
      return this
    }
  }) as unknown as MockResponse

describe('Error Middleware', () => {
  let mockRequest: Request
  let mockResponse: MockResponse
  const mockNext = {} as NextFunction

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      originalUrl: '/test',
      headers: {}
    } as Request
    mockResponse = createMockResponse()
    mockLogger.error.mockReset()
  })

  describe('FormattedResponseError handling', () => {
    const testError = new FormattedResponseError(400, 'Test error')

    it('should set correct status code and message', () => {
      errorMiddleware(testError, mockRequest, mockResponse, mockNext)

      expect(mockResponse.statusCode).toBe(400)
      expect(mockResponse.body).toEqual({
        status: 'error',
        message: 'Test error',
        errors: null
      })
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Test error',
        expect.objectContaining({
          method: 'GET',
          url: '/test'
        })
      )
    })
  })

  describe('ZodError handling', () => {
    const testError = new ZodError([
      {
        code: 'invalid_type',
        path: ['name'],
        message: 'Required',
        expected: 'string',
        received: 'number'
      }
    ])

    it('should handle validation errors correctly', () => {
      errorMiddleware(testError, mockRequest, mockResponse, mockNext)

      expect(mockResponse.statusCode).toBe(422)
      expect(mockResponse.body).toEqual({
        status: 'error',
        message: 'Unprocessable Entity: The request could not be processed.',
        errors: [{ field: 'name', message: 'Required' }]
      })
      expect(mockLogger.error).not.toHaveBeenCalled()
    })
  })

  describe('Generic error handling', () => {
    const testError = new Error('Unexpected error')

    it('should handle unknown errors correctly', () => {
      errorMiddleware(testError, mockRequest, mockResponse, mockNext)

      expect(mockResponse.statusCode).toBe(500)
      expect(mockResponse.body).toEqual({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        errors: null
      })
      expect(mockLogger.error).toHaveBeenCalledWith(
        testError.message,
        expect.objectContaining({
          method: 'GET',
          url: '/test',
          stack: expect.any(String)
        })
      )
    })
  })
})

import { describe, it, expect, mock } from 'bun:test'
import type { Request, Response, NextFunction } from 'express'

import ApiController from '../../../../src/controllers/api/api.controller'
import { responseSuccess } from '../../../../src/utils/response.util'

// Mock dependencies
mock.module('../../../../src/utils/response.util.ts', () => ({
  responseSuccess: mock(() => {})
}))

mock.module('../../../../src/lib/i18n/i18n.ts', () => ({
  t: mock(() => 'Welcome to the API!')
}))

describe('Api Controller', () => {
  describe('index', () => {
    it('should return a welcome message with a 200 status code', async () => {
      // Arrange
      const req = {} as Request
      const res = {
        status: mock(() => res),
        json: mock(() => res)
      } as unknown as Response
      const next = mock(() => {}) as NextFunction

      // Act
      await ApiController.index(req, res, next)

      // Assert
      expect(responseSuccess).toHaveBeenCalledTimes(1)
      expect(responseSuccess).toHaveBeenCalledWith(res, {
        statusCode: 200,
        message: 'Welcome to the API!',
        data: null
      })
      expect(next).not.toHaveBeenCalled()
    })

    it('should call next(error) if responseSuccess throws an error', async () => {
      // Arrange
      const req = {} as Request
      const res = {} as Response
      const next = mock(() => {}) as NextFunction

      // Simulate an error in `responseSuccess`
      responseSuccess.mockImplementationOnce(() => {
        throw new Error('Mocked error')
      })

      // Act
      await ApiController.index(req, res, next as NextFunction)

      // Assert
      expect(next).toHaveBeenCalledTimes(1)
      expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(next.mock.calls[0][0].message).toBe('Mocked error')
    })
  })
})

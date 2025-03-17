import { describe, it, expect, mock, beforeEach } from 'bun:test'
import type { Request, Response, NextFunction } from 'express'

import ApiController from '../../../../src/controllers/api/api.controller'
import { responseSuccess } from '../../../../src/utils/response.util'

mock.module('../../../../src/utils/response.util.ts', () => ({
  responseSuccess: mock(() => ({}))
}))

mock.module('../../../../src/lib/i18n/i18n.ts', () => ({
  t: mock(() => 'Welcome to the API!')
}))

describe('ApiController', () => {
  let req: Request
  let res: Response
  let next: NextFunction & { mock: { calls: Array<[Error]> } }

  beforeEach(() => {
    req = {} as Request
    res = {
      status: mock(() => res),
      json: mock(() => res)
    } as unknown as Response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next = mock((_err: Error) => {}) as unknown as NextFunction & {
      mock: { calls: Array<[Error]> }
    }
    mock(responseSuccess).mockClear()
  })

  describe('index', () => {
    it('should return welcome message with 200 status', async () => {
      await ApiController.index(req, res, next)

      expect(responseSuccess).toHaveBeenCalledTimes(1)
      expect(responseSuccess).toHaveBeenCalledWith(res, {
        statusCode: 200,
        message: 'Welcome to the API!',
        data: null
      })
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle responseSuccess errors properly', async () => {
      mock(responseSuccess).mockImplementationOnce(() => {
        throw new Error('Mocked error')
      })

      try {
        await ApiController.index(req, res, next)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('Mocked error')
      }

      expect(next).not.toHaveBeenCalled()
    })
  })
})

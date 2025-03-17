import { describe, it, expect, mock, beforeEach } from 'bun:test'
import type { Request, Response, NextFunction } from 'express'
import { localizationMiddleware } from '../../../src/middlewares/localization.middleware'

const mockChangeLanguage = mock(() => Promise.resolve())
mock.module('i18next', () => ({
  changeLanguage: mockChangeLanguage
}))

describe('localizationMiddleware', () => {
  let mockReq: Request
  let mockRes: Response
  let mockNext: NextFunction
  let mockNextCalls: Array<unknown[]>

  beforeEach(() => {
    mockReq = { headers: {}, query: {} } as Request
    mockRes = {} as Response
    mockNextCalls = []
    mockNext = mock((...args: unknown[]) => {
      mockNextCalls.push(args)
    })
    mockChangeLanguage.mockClear()
  })

  describe('language detection', () => {
    it('should prioritize accept-language header', async () => {
      mockReq.headers['accept-language'] = 'fr-CA'
      mockReq.query.lang = 'es'

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('fr-ca')
      expect(mockNextCalls).toEqual([[]])
    })

    it('should use query parameter when header missing', async () => {
      mockReq.query.lang = 'de'

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('de')
      expect(mockNextCalls).toEqual([[]])
    })

    it('should default to english with no inputs', async () => {
      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('en')
      expect(mockNextCalls).toEqual([[]])
    })
  })

  describe('error handling', () => {
    it('should pass errors to next function', async () => {
      const testError = new Error('Language change failed')
      mockChangeLanguage.mockImplementationOnce(() => Promise.reject(testError))
      mockReq.headers['accept-language'] = 'ja'

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockNextCalls).toHaveLength(1)
      expect(mockNextCalls[0][0]).toBeInstanceOf(Error)
      expect((mockNextCalls[0][0] as Error).message).toBe(
        'Language change failed'
      )
    })
  })

  describe('edge cases', () => {
    it('should handle uppercase language codes', async () => {
      mockReq.headers['accept-language'] = 'ZH-TW'
      mockReq.query.lang = 'PT-BR'

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('zh-tw')
    })

    it('should handle multiple accept-language values', async () => {
      mockReq.headers['accept-language'] = 'fr-CH, fr;q=0.9, en;q=0.8'

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('fr-ch')
    })

    it('should handle empty strings', async () => {
      mockReq.headers['accept-language'] = ''
      mockReq.query.lang = ''

      localizationMiddleware(mockReq, mockRes, mockNext)
      await Bun.sleep(0)

      expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    })
  })
})

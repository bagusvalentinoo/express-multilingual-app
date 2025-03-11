import { describe, it, expect, mock, beforeEach } from 'bun:test'

import {
  logError,
  logInfo,
  logDebug,
  logWarn
} from '../../../src/utils/logger.util'

const mockLogger = {
  error: mock(),
  info: mock(),
  debug: mock(),
  warn: mock()
}

mock.module('../../../src/lib/logger/winston.ts', () => ({
  default: mockLogger
}))

describe('Logger Utility Functions', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockLogger.error.mockClear()
    mockLogger.info.mockClear()
    mockLogger.debug.mockClear()
    mockLogger.warn.mockClear()
  })

  describe('logError', () => {
    it('should log an error message with stack trace and context', () => {
      const error = new Error('Test error')
      const context = { url: '/test', method: 'GET' }

      logError(error, context)

      console.log(
        'Mock Logger Error Message: ',
        mockLogger.error.mock.calls[0][0]
      )
      expect(mockLogger.error).toHaveBeenCalledWith(error.message, {
        ...context,
        stack: error.stack
      })
    })

    it('should log an error message without context if none is provided', () => {
      const error = new Error('Test error')

      logError(error)

      expect(mockLogger.error).toHaveBeenCalledWith(error.message, {
        stack: error.stack
      })
    })

    it('should handle null or undefined error objects gracefully', () => {
      logError(null as unknown as Error)

      expect(mockLogger.error).toHaveBeenCalledWith('Unknown error', {
        stack: undefined
      })
    })
  })

  describe('logInfo', () => {
    it('should log an info message with context', () => {
      const message = 'Database successfully connected'
      const context = { dbHost: 'localhost', dbPort: 5432 }

      logInfo(message, context)

      expect(mockLogger.info).toHaveBeenCalledWith(message, context)
    })

    it('should log an info message without context if none is provided', () => {
      const message = 'Database successfully connected'

      logInfo(message)

      expect(mockLogger.info).toHaveBeenCalledWith(message, {})
    })

    it('should handle empty messages gracefully', () => {
      const message = ''

      logInfo(message)

      expect(mockLogger.info).toHaveBeenCalledWith(message, {})
    })
  })

  describe('logDebug', () => {
    it('should log a debug message with context', () => {
      const message = 'Logic business successfully executed'
      const context = { result: 'success' }

      logDebug(message, context)

      expect(mockLogger.debug).toHaveBeenCalledWith(message, context)
    })

    it('should log a debug message without context if none is provided', () => {
      const message = 'Logic business successfully executed'

      logDebug(message)

      expect(mockLogger.debug).toHaveBeenCalledWith(message, {})
    })

    it('should handle empty messages gracefully', () => {
      const message = ''

      logDebug(message)

      expect(mockLogger.debug).toHaveBeenCalledWith(message, {})
    })
  })

  describe('logWarn', () => {
    it('should log a warning message with context', () => {
      const message = 'Logic business failed'
      const context = { result: 'failure' }

      logWarn(message, context)

      expect(mockLogger.warn).toHaveBeenCalledWith(message, context)
    })

    it('should log a warning message without context if none is provided', () => {
      const message = 'Logic business failed'

      logWarn(message)

      expect(mockLogger.warn).toHaveBeenCalledWith(message, {})
    })

    it('should handle empty messages gracefully', () => {
      const message = ''

      logWarn(message)

      expect(mockLogger.warn).toHaveBeenCalledWith(message, {})
    })
  })
})

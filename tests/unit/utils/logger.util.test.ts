import { describe, it, expect, mock, beforeEach } from 'bun:test'

const mockLogger = {
  error: mock(() => {}),
  info: mock(() => {}),
  debug: mock(() => {}),
  warn: mock(() => {})
}

mock.module('../../../src/lib/logger/winston.ts', () => ({
  default: mockLogger
}))

const { logError, logInfo, logDebug, logWarn } = await import(
  '../../../src/utils/logger.util'
)

describe('Logger Utility Functions', () => {
  beforeEach(() => {
    mockLogger.error.mockReset()
    mockLogger.info.mockReset()
    mockLogger.debug.mockReset()
    mockLogger.warn.mockReset()
  })

  describe('logError', () => {
    it('should log an error message with stack trace and context', () => {
      const error = new Error('Test error')
      const context = { url: '/test', method: 'GET' }

      logError(error, context)

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Test error',
        expect.objectContaining({
          url: '/test',
          method: 'GET',
          stack: error.stack
        })
      )
    })

    it('should log an error message without context if none is provided', () => {
      const error = new Error('Test error')

      logError(error)

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Test error',
        expect.objectContaining({
          stack: error.stack
        })
      )
    })

    it('should handle null or undefined error objects gracefully', () => {
      logError(null as unknown as Error)

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Unknown error',
        expect.objectContaining({})
      )
    })

    it('should handle string errors correctly', () => {
      const stringError = 'String-based error'

      logError(stringError)

      expect(mockLogger.error).toHaveBeenCalledWith(
        stringError,
        expect.objectContaining({})
      )
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

import logger from '@/lib/logger/winston'

/**
 * Logs an error message with context information
 *
 * @param {Error} error - The error object to log
 * @param {Object} context - Additional context information to include in the log
 *
 * @example
 * ```typescript
 * try {
 *   // ...
 * } catch (error) {
 *   logError(error)
 * }
 * ```
 *
 * @example
 * ```typescript
 * logError(error, {
 *   url: req.originalUrl,
 *   method: req.method
 * })
 * ```
 */
export const logError = (error: Error, context: object = {}) => {
  logger.error(error.message, {
    ...context,
    stack: error.stack
  })
}

/**
 * Logs an info message with context information
 *
 * @param {string} message - The message to log
 * @param {Object} context - Additional context information to include in the log
 *
 * @example
 * ```typescript
 * logInfo(`Database successfully connected`)
 * ```
 */
export const logInfo = (message: string, context: object = {}) => {
  logger.info(message, context)
}

/**
 * Logs a debug message with context information
 *
 * @param {string} message - The message to log
 * @param {Object} context - Additional context information to include in the log
 *
 * @example
 * ```typescript
 * const result = await doSomething()
 * logDebug(`Logic business successfully with result: ${result}`)
 * ```
 */
export const logDebug = (message: string, context: object = {}) => {
  logger.debug(message, context)
}

/**
 * Logs a warning message with context information
 *
 * @param {string} message - The message to log
 * @param {Object} context - Additional context information to include in the log
 *
 * @example
 * ```typescript
 * const result = await doSomething()
 * logWarn(`Logic business failed with result: ${result}`)
 * ```
 */
export const logWarn = (message: string, context: object = {}) => {
  logger.warn(message, context)
}

// Export the logger instance as default
export default logger

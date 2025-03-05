import fs from 'fs'

import { createLogger, format, transports } from 'winston'

import {
  LOG_DIR,
  LOG_LEVEL,
  MAX_FILE_SIZE,
  MAX_FILES
} from '@/constants/config/logger.constant'

/**
 * The format for the development environment
 */
const developmentFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : ''
    return `${timestamp} [${level}]: ${message} ${metaString}`
  })
)

/**
 * The format for the production environment - JSON formatted
 */
const productionFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.uncolorize(),
  format.json()
)

/**
 * The common transport options
 */
const commonTransportOptions = {
  maxsize: MAX_FILE_SIZE,
  maxFiles: MAX_FILES,
  tailable: true,
  format: productionFormat
}

/**
 * The logger instance
 */
const logger = createLogger({
  level: LOG_LEVEL,
  format:
    process.env.NODE_ENV === 'production'
      ? productionFormat
      : developmentFormat,
  transports: [
    // Console transport with environment-specific formatting
    new transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? productionFormat
          : developmentFormat
    }),

    // Error log file
    new transports.File({
      ...commonTransportOptions,
      filename: `${LOG_DIR}/application.log`,
      level: 'error',
      handleExceptions: true,
      handleRejections: true
    })
  ],
  // Don't exit on handled exceptions
  exitOnError: false
})

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })

// Handle uncaught exceptions
logger.exceptions.handle(
  new transports.File({
    ...commonTransportOptions,
    filename: `${LOG_DIR}/application.log`
  })
)

// Handle unhandled rejections
logger.rejections.handle(
  new transports.File({
    ...commonTransportOptions,
    filename: `${LOG_DIR}/application.log`
  })
)

// Export the logger instance
export default logger

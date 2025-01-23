import { createLogger, format, transports } from 'winston'
import path from 'path'
import { fileURLToPath } from 'url'

// To get __dirname in ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define log format for console
const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    ({ timestamp, level, message, ...meta }) =>
      `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`
  )
)

// Define log format for files
const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
)

// Initialize logger
const logger = createLogger({
  level: 'info', // Default log level
  format: fileFormat, // Default format for file transports
  transports: [
    // Console transport for colored logs
    new transports.Console({
      format: consoleFormat
    }),

    // File transport for error logs
    new transports.File({
      filename: path.join(__dirname, '../../logs', 'app.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false // Do not exit on handled exceptions
})

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new transports.File({
    filename: path.join(__dirname, '../../logs', 'app.log')
  })
)

logger.rejections.handle(
  new transports.File({
    filename: path.join(__dirname, '../../logs', 'app.log')
  })
)

export default logger

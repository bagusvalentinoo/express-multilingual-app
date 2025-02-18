/**
 * The directory to store the logs
 */
export const LOG_DIR = './logs' as const

/**
 * The level of the logs
 */
export const LOG_LEVEL =
  process.env.NODE_ENV === 'production' ? 'info' : 'debug'

/**
 * The maximum size of the log file
 */
export const MAX_FILE_SIZE = 5242880 as const // 5MB

/**
 * The maximum number of log files
 */
export const MAX_FILES = 5 as const

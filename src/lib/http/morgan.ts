import { createWriteStream } from 'fs'

import morgan from 'morgan'

// Get the current environment
const env = process.env.NODE_ENV

/**
 * Morgan middleware for logging HTTP requests
 *
 * @example
 * ```typescript
 * app.use(morganMiddleware)
 * ```
 */
export const morganMiddleware = morgan(
  env === 'development' ? 'dev' : 'combined',
  {
    // Write logs to a file
    stream:
      env === 'production'
        ? createWriteStream('./logs/access.log', { flags: 'a' })
        : undefined,
    // Skip logging if the response status code is less than 400
    skip: (_req, res) => {
      return env === 'production' && res.statusCode < 400
    }
  }
)

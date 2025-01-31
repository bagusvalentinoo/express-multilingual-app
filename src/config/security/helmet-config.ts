/* eslint-disable quotes */
import type { RequestHandler } from 'express'
import helmet from 'helmet'

/**
 * Returns a helmet middleware configuration to secure Express
 * with a Content Security Policy.
 *
 * The policy is as follows:
 * - `defaultSrc`: only allow scripts/styles from the same origin
 * - `scriptSrc`: allow inline scripts and only scripts from the same origin
 * - `styleSrc`: allow inline styles and only styles from the same origin
 * - `imgSrc`: allow images from the same origin, data URLs, and
 *   the Swagger validator
 * - `connectSrc`: only allow connections to the same origin
 * - `frameSrc`: do not allow any frames
 * - `objectSrc`: do not allow any objects
 * @returns {RequestHandler} - The express middleware to use
 */
export const helmetConfig = (): RequestHandler => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://validator.swagger.io'],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'same-origin' }
  })
}

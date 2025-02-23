/* eslint-disable quotes */

import helmet from 'helmet'

/**
 * Configures security headers for Express applications using Helmet.
 *
 * This function sets up a content security policy, and configures
 * additional security-related headers to enhance the application's
 * protection against common vulnerabilities.
 *
 * @returns An Express middleware function configured with Helmet security settings.
 *
 * @example
 * ```typescript
 * app.use(helmetConfig())
 * ```
 */
export const helmetConfig = () =>
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Allow resources only from the same origin
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for dynamic content
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for theming
        imgSrc: ["'self'", 'data:', 'https://validator.swagger.io'], // Allow images from specific sources
        connectSrc: ["'self'"], // Restrict connections to the same origin
        frameSrc: ["'none'"], // Disallow framing this content
        objectSrc: ["'none'"] // Disallow embedding objects
      }
    },
    crossOriginEmbedderPolicy: false, // Disable COEP for broader compatibility
    referrerPolicy: { policy: 'same-origin' } // Limit referrer information to same-origin requests
  })

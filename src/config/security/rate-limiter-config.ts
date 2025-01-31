import type { RequestHandler } from 'express'
import rateLimit from 'express-rate-limit'
import { t } from 'i18next'

/**
 * Creates a rate limiter middleware for Express.
 * @param {number} windowMinutes - The time window in minutes for rate limiting.
 * @param {number} maxRequests - The maximum number of requests allowed in the time window.
 * @returns {RequestHandler} - The rate limiter middleware request handler.
 */

const rateLimiter = (
  windowMinutes: number,
  maxRequests: number
): RequestHandler => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: t('rate_limiter.too_many_requests', { ns: 'configuration' }),
    validate: { trustProxy: false }
  })
}

export const apiLimiter = rateLimiter(15, 100)

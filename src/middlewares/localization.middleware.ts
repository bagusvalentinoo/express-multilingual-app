import type { Request, Response, NextFunction } from 'express'
import { changeLanguage } from 'i18next'

import { parseLanguageHeader } from '@/utils/i18n.util'

/**
 * Middleware to handle request localization
 *
 * @param {Request} req - Express request object
 * @param {Response} _res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @example
 * ```typescript
 * app.use(localizationMiddleware)
 * ```
 */
export const localizationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Ensure headerLang is explicitly checked for null or undefined
  const headerLang = req.headers['accept-language']
  const languageFromHeader =
    typeof headerLang === 'string' && headerLang.trim() !== ''
      ? parseLanguageHeader(headerLang.trim())
      : null

  // Ensure queryLang is explicitly checked for null or undefined
  const queryLang = req.query.lang
  const languageFromQuery =
    typeof queryLang === 'string' && queryLang.trim() !== ''
      ? queryLang.trim().toLowerCase()
      : null

  // Use nullish coalescing operator (??) for safer fallback handling
  const language = languageFromHeader ?? languageFromQuery ?? 'en'

  changeLanguage(language)
    .then(() => next())
    .catch(error => next(error))
}

import type { Request, Response, NextFunction } from 'express'
import { changeLanguage } from 'i18next'

/**
 * Middleware to change the language of the request
 *
 * @param {Request} req The Express request object.
 * @param {Response} _res The Express response object.
 * @param {NextFunction} next The Express next middleware function.
 */
export const localizationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Get the language from the header or query
  const languageFromHeader = req.headers['accept-language'] as string
  const languageFromQuery = req.query.lang as string

  // Get the language from the header or query
  const language = languageFromHeader || languageFromQuery || 'en'

  // Change the language
  changeLanguage(language)
    .then(() => next()) // Call the next middleware
    .catch(error => next(error)) // Call the next middleware with the error
}

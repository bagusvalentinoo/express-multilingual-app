/**
 * The allowed origins
 */
export const CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
] as const

/**
 * The allowed methods
 */
export const CORS_ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
] as const

/**
 * The allowed headers
 */
export const CORS_ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'X-CSRF-Token',
  'Accept-Language'
] as const

/**
 * An array of allowed CORS origins.
 * @type {ReadonlyArray<string>}
 */
export const CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
] as const

export type CorsOrigin = (typeof CORS_ORIGINS)[number]

export const CORS_ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
] as const

export type CorsAllowedMethod = (typeof CORS_ALLOWED_METHODS)[number]

export const CORS_ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'X-CSRF-Token',
  'Accept-Language'
] as const

export type CorsAllowedHeader = (typeof CORS_ALLOWED_HEADERS)[number]

/**
 * Request Method
 */
export type RequestMethod = 'get' | 'post' | 'put' | 'delete'

/**
 * Request Type
 */
export type RequestType = 'get' | 'create' | 'update' | 'delete'

/**
 * Languages
 */
export type Languages = 'en' | 'id' | 'default'

/**
 * Request Options
 *
 * method: The HTTP method to use
 * url: The URL to send the request to
 * data: The data to send with the request (optional)
 * language: The language to use for the request
 * headers: Additional headers to send with the request (optional)
 * query: Query parameters to send with the request (optional)
 */
export type MakeRequestOptions = {
  method: RequestMethod
  url: string
  data?: object
  language?: Languages
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean>
}

/**
 * Get Resource Message Options
 *
 * type: The HTTP method to use
 * key: The key to get the resource message
 * language: The language to use
 */
export type GetSuccessDataResourceMessageOptions = {
  type: RequestType
  key: string
  language?: Languages
}

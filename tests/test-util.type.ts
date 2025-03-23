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
 */
export type MakeRequestOptions = {
  method: RequestMethod
  url: string
  data?: object
  language: Languages
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
  language: Languages
}

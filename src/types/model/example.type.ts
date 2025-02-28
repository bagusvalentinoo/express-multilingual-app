/**
 * The response type for an example
 *
 * id - The id of the example
 * key1 - The key1 of the example
 * key2 - The key2 of the example
 * key3 - The key3 of the example
 * created_at - The created_at of the example
 * updated_at - The updated_at of the example
 */
export type ExampleResponse = {
  id: string
  key1: string
  key2: string
  key3: string
  created_at: Date
  updated_at: Date
}

/**
 * The response type for a list of examples
 *
 * examples - The list of examples
 */
export type GetExamplesResponse = {
  examples: ExampleResponse[]
}

/**
 * The request type for creating or updating an example
 *
 * key1 - The key1 of the example
 * key2 - The key2 of the example
 * key3 - The key3 of the example
 */
export type CreateUpdateExampleRequest = {
  key1: string
  key2: string
  key3: string
}

/**
 * The response type for creating or updating an example
 *
 * example - The created or updated example
 */
export type CreateUpdateExampleResponse = {
  example: ExampleResponse
}

/**
 * The request type for deleting an example
 *
 * ids - The ids of the examples to delete
 */
export type DeleteBatchExampleRequest = {
  ids: string[]
}

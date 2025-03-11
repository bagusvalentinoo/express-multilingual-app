// This is a service just for dummy testing purposes

import {
  createUpdateExampleSchema,
  findExampleSchema,
  deleteBatchExampleSchema
} from '@/schemas/example/example.schema'
import type {
  ExampleResponse,
  GetExamplesResponse,
  CreateUpdateExampleRequest,
  CreateUpdateExampleResponse,
  DeleteBatchExampleRequest
} from '@/types/model/example.type'
import { validate } from '@/utils/validation.util'

/**
 * Get examples
 *
 * @returns {Promise<GetExamplesResponse>} - The examples
 *
 * @example
 * ```typescript
 * const examples = await ExampleService.getExamples()
 * ```
 */
const getExamples = async (): Promise<GetExamplesResponse> => {
  // Generate 10 examples
  const examples = Array.from({ length: 10 }, (_, index) => {
    const baseIndex = index * 3 + 1 // Calculate the base index

    // Generate the example
    return {
      id: crypto.randomUUID(),
      key1: `key${baseIndex}`,
      key2: `key${baseIndex + 1}`,
      key3: `key${baseIndex + 2}`,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // Return the examples
  return { examples }
}

/**
 * Create an example
 *
 * @param {CreateUpdateExampleRequest} req - The request body
 *
 * @returns {Promise<CreateUpdateExampleResponse>} - The created example
 *
 * @example
 * ```typescript
 * const example = await ExampleService.createExample(request as CreateUpdateExampleRequest)
 * ```
 */
const createExample = async (
  req: CreateUpdateExampleRequest
): Promise<CreateUpdateExampleResponse> => {
  // Validate the request body and get the validated data
  const { key1, key2, key3 } = validate(createUpdateExampleSchema(), req)

  // Create the example
  return {
    example: {
      id: crypto.randomUUID(),
      key1,
      key2,
      key3,
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}

/**
 * Find an example by id
 *
 * @param {string} id - The id of the example
 *
 * @returns {Promise<ExampleResponse>} - The example
 *
 * @example
 * ```typescript
 * const example = await ExampleService.getExampleById('123')
 * ```
 */
const getExampleById = async (
  id: string
): Promise<{ example: ExampleResponse }> => {
  // Validate the id and get the validated data
  const validatedId = validate(findExampleSchema(), id)

  // Return the example
  return {
    example: {
      id: validatedId,
      key1: 'key1',
      key2: 'key2',
      key3: 'key3',
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}

/**
 * Update an example by id
 *
 * @param {string} id - The id of the example
 * @param {CreateUpdateExampleRequest} req - The request body
 *
 * @returns {Promise<CreateUpdateExampleResponse>} - The updated example
 *
 * @example
 * ```typescript
 * const example = await ExampleService.updateExampleById('123', request as CreateUpdateExampleRequest)
 * ```
 */
const updateExampleById = async (
  id: string,
  req: CreateUpdateExampleRequest
): Promise<CreateUpdateExampleResponse> => {
  // Validate the id and get the validated data
  const validatedId = validate(findExampleSchema(), id)

  // Validate the request body and get the validated data
  const { key1, key2, key3 } = validate(createUpdateExampleSchema(), req)

  // Update the example
  return {
    example: {
      id: validatedId,
      key1,
      key2,
      key3,
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}

/**
 * Delete a batch of examples
 *
 * @param {DeleteBatchExampleRequest} req - The request body
 *
 * @returns {Promise<string[]>} - The deleted examples
 *
 * @example
 * ```typescript
 * await ExampleService.deleteExampleBatch(request as DeleteBatchExampleRequest)
 * ```
 */
const deleteExampleBatch = async (
  req: DeleteBatchExampleRequest
): Promise<string[]> => {
  // This is a dummy implementation

  // Validate the request body and get the validated data
  const { ids } = validate(deleteBatchExampleSchema(), req)

  // Delete the examples
  return ids
}

// Export the example service
export default {
  getExamples,
  createExample,
  getExampleById,
  updateExampleById,
  deleteExampleBatch
}

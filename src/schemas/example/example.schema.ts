import { z, type ZodType } from 'zod'

import type {
  CreateUpdateExampleRequest,
  DeleteBatchExampleRequest
} from '@/types/model/example.type'
import {
  requiredString,
  requiredStringArray
} from '@/utils/validation/zod.util'

/**
 * Schema for creating or updating an example
 *
 * @returns {ZodType<CreateUpdateExampleRequest>} - The schema
 *
 * @example
 * ```typescript
 * const data = createUpdateExampleSchema.parse({
 *   key1: 'value1',
 *   key2: 'value2',
 *   key3: 'value3'
 * })
 * ```
 */
export const createUpdateExampleSchema =
  (): ZodType<CreateUpdateExampleRequest> =>
    z.object({
      key1: requiredString('key1'),
      key2: requiredString('key2'),
      key3: requiredString('key3')
    })

/**
 * Schema for finding an example by ID
 *
 * @returns {ZodType<string>} - The schema
 *
 * @example
 * ```typescript
 * const { id } = findExampleSchema.parse('123')
 * ```
 */
export const findExampleSchema = (): ZodType<string> => requiredString('ID')

/**
 * Schema for batch deleting examples
 *
 * @returns {ZodType<DeleteBatchExampleRequest>} - The schema
 *
 * @example
 * ```typescript
 * const { ids } = deleteBatchExampleSchema.parse({
 *   ids: ['1', '2', '3']
 * })
 * ```
 */
export const deleteBatchExampleSchema =
  (): ZodType<DeleteBatchExampleRequest> =>
    z.object({
      ids: requiredStringArray('IDs')
    })

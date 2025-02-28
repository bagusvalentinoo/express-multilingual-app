import { z, type ZodType } from 'zod'

import type {
  CreateUpdateExampleRequest,
  DeleteBatchExampleRequest
} from '@/types/model/example.type'

/**
 * The schema for creating or updating an example
 *
 * @example
 * ```typescript
 * const { key1, key2, key3 } = CREATE_UPDATE.parse({ key1: 'key1', key2: 'key2', key3: 'key3' })
 * ```
 *
 * @example
 * ```typescript
 * const { key1, key2, key3 } = validate(CREATE_UPDATE, req)
 * ```
 */
export const CREATE_UPDATE: ZodType<CreateUpdateExampleRequest> = z.object({
  key1: z
    .string({
      required_error: 'ns:validation,key:required,params:field=key1'
    })
    .min(1, {
      message: 'ns:validation,key:required,params:field=key1'
    }),
  key2: z
    .string({
      required_error: 'ns:validation,key:required,params:field=key2'
    })
    .min(1, {
      message: 'ns:validation,key:required,params:field=key2'
    }),
  key3: z
    .string({
      required_error: 'ns:validation,key:required,params:field=key3'
    })
    .min(1, {
      message: 'ns:validation,key:required,params:field=key3'
    })
})

/**
 * The schema for finding an example
 *
 * @example
 * ```typescript
 * const { id } = FIND.parse('1')
 * ```
 *
 * @example
 * ```typescript
 * const { id: idExample } = validate(FIND, id)
 * ```
 */
export const FIND: ZodType<string> = z
  .string({
    required_error: 'ns:validation,key:required,params:field=ID'
  })
  .min(1, {
    message: 'ns:validation,key:required,params:field=ID'
  })

/**
 * The schema for deleting a batch of examples
 *
 * @example
 * ```typescript
 * const { ids } = DELETE_BATCH.parse(['1', '2', '3'])
 * ```
 *
 * @example
 * ```typescript
 * const { ids } = validate(DELETE_BATCH, req)
 * ```
 */
export const DELETE_BATCH: ZodType<DeleteBatchExampleRequest> = z.object({
  ids: z
    .array(
      z
        .string({
          required_error: 'ns:validation,key:required,params:field=ID'
        })
        .min(1, {
          message: 'ns:validation,key:required,params:field=ID'
        })
    )
    .min(1, {
      message: 'ns:validation,key:required,params:field=ID'
    })
})

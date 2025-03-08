import { describe, it, expect } from 'bun:test'
import { z, ZodError } from 'zod'

import { validate } from '../../../../src/utils/validation/validation.util'

describe('Validation Utility', () => {
  describe('validate()', () => {
    // Test group for successful validations
    describe('when validation succeeds', () => {
      it('should validate a simple object with string property', () => {
        const schema = z.object({ name: z.string() })
        const data = { name: 'John' }

        expect(validate(schema, data)).toEqual(data)
      })

      it('should validate nested objects', () => {
        const schema = z.object({
          user: z.object({
            name: z.string(),
            age: z.number()
          })
        })
        const data = { user: { name: 'John', age: 30 } }

        expect(validate(schema, data)).toEqual(data)
      })

      it('should validate arrays', () => {
        const schema = z.array(z.string())
        const data = ['apple', 'banana', 'orange']

        expect(validate(schema, data)).toEqual(data)
      })
    })

    // Test group for validation failures
    describe('when validation fails', () => {
      it('should throw ZodError for incorrect type', () => {
        const schema = z.object({ name: z.string() })
        const data = { name: 123 }

        expect(() => validate(schema, data)).toThrow(ZodError)
      })

      it('should throw ZodError for missing required fields', () => {
        const schema = z.object({ name: z.string() })
        const data = {}

        expect(() => validate(schema, data)).toThrow(ZodError)
      })

      it('should throw ZodError for extra fields with strict()', () => {
        const schema = z.object({ name: z.string() }).strict()
        const data = { name: 'John', extra: 'field' }

        expect(() => validate(schema, data)).toThrow(ZodError)
      })
    })

    // Test group for edge cases
    describe('edge cases', () => {
      it('should handle empty objects with empty schema', () => {
        const schema = z.object({})
        const data = {}

        expect(validate(schema, data)).toEqual(data)
      })

      it('should validate optional fields', () => {
        const schema = z.object({
          required: z.string(),
          optional: z.string().optional()
        })
        const data = { required: 'value' }

        expect(validate(schema, data)).toEqual(data)
      })

      it('should validate null values when explicitly allowed', () => {
        const schema = z.object({
          nullableField: z.string().nullable()
        })
        const data = { nullableField: null }

        expect(validate(schema, data)).toEqual(data)
      })
    })
  })
})

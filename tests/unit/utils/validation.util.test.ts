import { describe, it, expect } from 'bun:test'
import { z } from 'zod'
import type { ZodIssue } from 'zod'

import {
  validate,
  customFormatZodError
} from '../../../src/utils/validation.util'

describe('Validation Utility', () => {
  describe('validate', () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().min(0)
    })

    it('should return validated data when input matches schema', () => {
      const inputData = { name: 'John Doe', age: 30 }
      const result = validate(schema, inputData)
      expect(result).toEqual(inputData)
    })

    it('should throw error for invalid data', () => {
      const invalidData = { name: 'John Doe', age: -5 }
      expect(() => validate(schema, invalidData)).toThrow()
    })

    it('should handle nested objects', () => {
      const nestedSchema = z.object({
        user: z.object({
          name: z.string(),
          details: z.object({
            age: z.number(),
            isAdmin: z.boolean()
          })
        })
      })

      const validData = {
        user: {
          name: 'Alice',
          details: { age: 25, isAdmin: true }
        }
      }

      expect(validate(nestedSchema, validData)).toEqual(validData)
    })
  })

  describe('customFormatZodError', () => {
    it('should format zod errors correctly', () => {
      const mockErrors: ZodIssue[] = [
        {
          code: 'invalid_type',
          path: ['user', 'age'],
          message: 'Expected number',
          expected: 'number',
          received: 'string'
        } as ZodIssue
      ]

      const result = customFormatZodError(mockErrors)
      expect(result).toEqual([
        { field: 'user.age', message: 'Expected number' }
      ])
    })

    it('should handle empty error list', () => {
      expect(customFormatZodError([])).toEqual([])
    })

    it('should handle array indices in paths', () => {
      const mockErrors: ZodIssue[] = [
        {
          code: 'invalid_type',
          path: ['users', 0, 'name'],
          message: 'Required',
          expected: 'string',
          received: 'number'
        } as ZodIssue
      ]

      const result = customFormatZodError(mockErrors)
      expect(result).toEqual([{ field: 'users.0.name', message: 'Required' }])
    })
  })
})

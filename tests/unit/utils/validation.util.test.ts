import { describe, it, expect } from 'bun:test'
import { z, type ZodIssue } from 'zod'

import {
  validate,
  customFormatZodError
} from '../../../src/utils/validation.util'

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

  it('should throw an error when input does not match schema', () => {
    const invalidData = { name: 'John Doe', age: -5 }

    expect(() => validate(schema, invalidData)).toThrow()
  })

  it('should handle deeply nested objects correctly', () => {
    const nestedSchema = z.object({
      user: z.object({
        name: z.string().min(1),
        details: z.object({
          age: z.number().min(0),
          isAdmin: z.boolean()
        })
      })
    })

    const nestedData = {
      user: {
        name: 'Alice',
        details: {
          age: 25,
          isAdmin: true
        }
      }
    }

    const result = validate(nestedSchema, nestedData)

    expect(result).toEqual(nestedData)
  })

  it('should throw an error for missing required fields', () => {
    const incompleteData = { name: 'John Doe' }

    expect(() => validate(schema, incompleteData)).toThrow()
  })
})

describe('customFormatZodError', () => {
  it('should format Zod errors into a custom response structure', () => {
    const mockErrors: ZodIssue[] = [
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
        path: ['name'],
        message: 'Expected string, received number'
      },
      {
        code: 'too_small',
        minimum: 0,
        type: 'number',
        inclusive: true,
        path: ['age'],
        message: 'Number must be greater than or equal to 0'
      }
    ]

    const expectedResult = [
      { field: 'name', message: 'Expected string, received number' },
      { field: 'age', message: 'Number must be greater than or equal to 0' }
    ]

    const result = customFormatZodError(mockErrors)

    expect(result).toEqual(expectedResult)
  })

  it('should handle empty error arrays gracefully', () => {
    const result = customFormatZodError([])

    expect(result).toEqual([])
  })

  it('should correctly format errors with deeply nested paths', () => {
    const mockErrors: ZodIssue[] = [
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
        path: ['user', 'details', 'name'],
        message: 'Expected string, received number'
      }
    ]

    const expectedResult = [
      {
        field: 'user.details.name',
        message: 'Expected string, received number'
      }
    ]

    const result = customFormatZodError(mockErrors)

    expect(result).toEqual(expectedResult)
  })
})

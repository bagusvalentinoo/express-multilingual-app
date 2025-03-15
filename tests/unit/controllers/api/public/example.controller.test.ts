import { describe, it, expect, mock } from 'bun:test'
import type { Request, Response, NextFunction } from 'express'
import ExampleController from '../../../../../src/controllers/api/public/example.controller'
import ExampleService from '../../../../../src/services/example/example.service'

// Mock utilities
const mockRequest = (overrides: Partial<Request> = {}) => ({ ...overrides }) as Request
const mockResponse = () => ({
  status: mock(() => ({ json: mock() })),
  json: mock()
} as unknown as Response)
const mockNext = mock(() => {}) as NextFunction

// Response interfaces
interface ExampleResponse {
  id: string
  name: string
}

interface ExampleListResponse {
  examples: ExampleResponse[]
}

// Mock factories
const createExampleResponse = (overrides?: Partial<ExampleResponse>) => ({
  example: {
    id: '1',
    name: 'Test Example',
    ...overrides
  }
})

const createExampleListResponse = (items = 1): ExampleListResponse => ({
  examples: Array.from({ length: items }, (_, i) => ({
    id: `${i+1}`,
    name: `Example ${i+1}`
  }))
})

// Test data
const mockExampleResponse = createExampleResponse()
const mockExampleListResponse = createExampleListResponse(2)

describe('ExampleController', () => {
  describe('index', () => {
    it('should return 200 with example list', async () => {
      // Arrange
      ExampleService.getExamples = mock(() => Promise.resolve(mockExampleListResponse))
      
      // Act
      await ExampleController.index(mockRequest(), mockResponse(), mockNext)

      // Assert
      expect(ExampleService.getExamples).toHaveBeenCalled()
    })

    it('should handle service errors', async () => {
      // Arrange
      const error = new Error('Database failure')
      ExampleService.getExamples = mock(() => Promise.reject(error))
      const next = mock(() => {})

      // Act
      await ExampleController.index(mockRequest(), mockResponse(), next)

      // Assert
      expect(next).toHaveBeenCalledWith(error)
    })
  })

  describe('store', () => {
    it('should create new example with valid payload', async () => {
      // Arrange
      const payload = { name: 'New Example' }
      ExampleService.createExample = mock(() => 
        Promise.resolve(createExampleResponse(payload))
      )
      const req = mockRequest({ body: payload })

      // Act
      await ExampleController.store(req, mockResponse(), mockNext)

      // Assert
      expect(ExampleService.createExample).toHaveBeenCalledWith(payload)
    })

    it('should reject invalid payloads', async () => {
      // Arrange
      const req = mockRequest({ 
        body: { invalid: 'data' } 
      })
      const next = mock(() => {})
      
      // Mock the service to throw validation error
      ExampleService.createExample = mock(() => 
        Promise.reject(new Error('Validation error'))
      )

      // Act
      await ExampleController.store(req, mockResponse(), next)

      // Assert
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('show', () => {
    it('should fetch example by ID', async () => {
      // Arrange
      ExampleService.getExampleById = mock(() => 
        Promise.resolve(mockExampleResponse)
      )
      const req = mockRequest({ params: { id: '1' } })

      // Act
      await ExampleController.show(req, mockResponse(), mockNext)

      // Assert
      expect(ExampleService.getExampleById).toHaveBeenCalledWith('1')
    })

    it('should handle invalid IDs', async () => {
      // Arrange
      const req = mockRequest({ params: { id: 'invalid' } })
      const next = mock(() => {})
      
      // Mock the service to throw not found error
      ExampleService.getExampleById = mock(() => 
        Promise.reject(new Error('Not found'))
      )

      // Act
      await ExampleController.show(req, mockResponse(), next)

      // Assert
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('update', () => {
    it('should update existing example', async () => {
      // Arrange
      const payload = { name: 'Updated Example' }
      ExampleService.updateExampleById = mock(() => 
        Promise.resolve(createExampleResponse(payload))
      )
      const req = mockRequest({ 
        params: { id: '1' },
        body: payload
      })

      // Act
      await ExampleController.update(req, mockResponse(), mockNext)

      // Assert
      expect(ExampleService.updateExampleById).toHaveBeenCalledWith('1', payload)
    })
  })

  describe('destroyBatch', () => {
    it('should delete multiple examples', async () => {
      // Arrange
      const mockDeletedIds = ['1', '2']
      ExampleService.deleteExampleBatch = mock(() => 
        Promise.resolve(mockDeletedIds)
      )
      const payload = { ids: ['1', '2'] }
      const req = mockRequest({ body: payload })

      // Act
      await ExampleController.destroyBatch(req, mockResponse(), mockNext)

      // Assert
      expect(ExampleService.deleteExampleBatch).toHaveBeenCalledWith(payload)
    })

    it('should handle empty batch delete', async () => {
      // Arrange
      ExampleService.deleteExampleBatch = mock(() => 
        Promise.reject(new Error('Invalid batch request'))
      )
      const req = mockRequest({ body: { ids: [] } })
      const next = mock(() => {})

      // Act
      await ExampleController.destroyBatch(req, mockResponse(), next)

      // Assert
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })
})

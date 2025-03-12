import { describe, it, expect } from 'bun:test'

import ExampleService from '../../../../src/services/example/example.service'

describe('Example Service', () => {
  describe('getExamples', () => {
    it('should return an array of examples', async () => {
      const result = await ExampleService.getExamples()

      expect(result).toHaveProperty('examples')
      expect(result.examples).toHaveLength(10)
      expect(result.examples[0]).toHaveProperty('id')
      expect(result.examples[0]).toHaveProperty('key1')
      expect(result.examples[0]).toHaveProperty('key2')
      expect(result.examples[0]).toHaveProperty('key3')
      expect(result.examples[0]).toHaveProperty('created_at')
      expect(result.examples[0]).toHaveProperty('updated_at')
    })
  })

  describe('createExample', () => {
    it('should create an example', async () => {
      const mockValidRequest = {
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 3'
      }

      const result = await ExampleService.createExample(mockValidRequest)

      expect(result).toHaveProperty('example')
      expect(result.example).toMatchObject({
        id: expect.any(String),
        key1: mockValidRequest.key1,
        key2: mockValidRequest.key2,
        key3: mockValidRequest.key3,
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      })
    })

    it('should throw an error if validation fails', async () => {
      expect(
        ExampleService.createExample({
          key1: '',
          key2: '',
          key3: ''
        })
      ).rejects.toThrow()
    })
  })

  describe('getExampleById', () => {
    const mockId = 'valid-id'

    it('should return an example with the given ID', async () => {
      const result = await ExampleService.getExampleById(mockId)

      expect(result).toHaveProperty('example')
      expect(result.example).toMatchObject({
        id: mockId,
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 3',
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      })
    })

    it('should throw an error if validation fails', async () => {
      expect(ExampleService.getExampleById('')).rejects.toThrow()
    })
  })

  describe('updateExampleById', () => {
    const mockId = 'valid-id'

    it('should update an example with the given ID and keys', async () => {
      const mockValidRequest = {
        key1: 'Key 1 Updated',
        key2: 'Key 2 Updated',
        key3: 'Key 3 Updated'
      }

      const result = await ExampleService.updateExampleById(
        mockId,
        mockValidRequest
      )

      expect(result).toHaveProperty('example')
      expect(result.example).toMatchObject({
        id: mockId,
        key1: mockValidRequest.key1,
        key2: mockValidRequest.key2,
        key3: mockValidRequest.key3,
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      })
    })

    it('should throw an error if validation fails', async () => {
      expect(
        ExampleService.updateExampleById(mockId, {
          key1: '',
          key2: '',
          key3: ''
        })
      ).rejects.toThrow()
    })
  })

  describe('deleteExampleBatch', () => {
    it('should return the list of deleted IDs', async () => {
      const mockValidRequest = {
        ids: ['id1', 'id2', 'id3']
      }

      const result = await ExampleService.deleteExampleBatch(mockValidRequest)

      expect(result).toEqual(mockValidRequest.ids)
    })

    it('should throw an error if validation fails', async () => {
      expect(
        ExampleService.deleteExampleBatch({
          ids: []
        })
      ).rejects.toThrow()
    })
  })
})

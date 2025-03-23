import { describe, it, expect } from 'bun:test'

import { makeRequest } from '../../test.util'

describe('Welcome API Integration Test', () => {
  const ENDPOINT = '/api/v1'

  describe('GET /api/v1/welcome', () => {
    it('should return a welcome message by default language set to English', async () => {
      const response = await makeRequest({
        method: 'get',
        url: ENDPOINT,
        language: 'default'
      })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe('Welcome to Express Multilingual App')
    })

    it('should return a welcome message in English', async () => {
      const response = await makeRequest({
        method: 'get',
        url: ENDPOINT,
        language: 'en'
      })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe('Welcome to Express Multilingual App')
    })

    it('should return a welcome message in Bahasa Indonesia', async () => {
      const response = await makeRequest({
        method: 'get',
        url: ENDPOINT,
        language: 'id'
      })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe(
        'Selamat datang di Express Multilingual App'
      )
    })
  })
})

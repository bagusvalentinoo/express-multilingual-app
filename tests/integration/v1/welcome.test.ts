import { describe, it, expect } from 'bun:test'
import { makeRequest } from '../../test.util'
import type { RequestMethod, Languages } from '../../test-util.type'

describe('Welcome API Integration Test', () => {
  const ENDPOINT = '/api/v1'
  const MESSAGES = {
    default: 'Welcome to Express Multilingual App',
    en: 'Welcome to Express Multilingual App',
    id: 'Selamat datang di Express Multilingual App'
  }

  const testCases = [
    { language: 'default', source: 'header' },
    { language: 'default', source: 'query' },
    { language: 'en', source: 'header' },
    { language: 'en', source: 'query' },
    { language: 'id', source: 'header' },
    { language: 'id', source: 'query' }
  ] as const

  const testWelcomeMessage = async (
    method: RequestMethod,
    language: Languages,
    source: 'header' | 'query'
  ) => {
    const url = source === 'query' ? `${ENDPOINT}?lang=${language}` : ENDPOINT
    const requestLanguage = source === 'header' ? language : 'default'

    const response = await makeRequest({
      method,
      url,
      language: requestLanguage,
      headers: source === 'header' ? { 'Accept-Language': language } : {}
    })

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('success')
    expect(response.body.message).toBe(MESSAGES[language])
  }

  describe('GET /api/v1', () => {
    testCases.forEach(({ language, source }) => {
      it(`should return a welcome message in ${language} language from ${source}`, async () => {
        await testWelcomeMessage('get', language, source)
      })
    })
  })
})

import { describe, it, expect } from 'bun:test'
import {
  makeRequest,
  getSuccessDataResourceMessage,
  getErrorValidationRequiredMessage,
  getErrorUnprocessableEntityMessage,
  getErrorValidationInvalidTypeMessage
} from '../../../test.util'
import type { Languages } from '../../../test-util.type'

describe('Example API Integration Tests', () => {
  const ENDPOINT = '/api/v1/example'
  const SINGULAR_KEY = 'Example'
  const PLURAL_KEY = 'Examples'
  const EXAMPLE_ID = 'id-this-is-just-for-dummy-demo'
  const VALID_INPUT = { key1: 'Key 1', key2: 'Key 2', key3: 'Key 3' }
  const UPDATED_INPUT = {
    key1: 'Key 1 Updated',
    key2: 'Key 2 Updated',
    key3: 'Key 3 Updated'
  }
  const EMPTY_INPUT = { key1: '', key2: '', key3: '' }
  const INVALID_INPUT = { key1: 1, key2: 2, key3: 3 }

  const testLanguages: Languages[] = ['default', 'en', 'id']

  describe('GET /api/v1/example', () => {
    const METHOD_OR_TYPE = 'get'

    testLanguages.forEach(LANGUAGE => {
      it(`should be able to get all examples in ${LANGUAGE} language using query parameter`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: ENDPOINT,
          query: { lang: LANGUAGE },
          language: 'default'
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: METHOD_OR_TYPE,
            key: PLURAL_KEY,
            language: LANGUAGE
          })
        )
        expect(response.body.data.examples).toBeDefined()
      })

      it(`should be able to get all examples in ${LANGUAGE} language using header`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: ENDPOINT,
          headers: { 'Accept-Language': LANGUAGE },
          language: 'default'
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: METHOD_OR_TYPE,
            key: PLURAL_KEY,
            language: LANGUAGE
          })
        )
        expect(response.body.data.examples).toBeDefined()
      })
    })
  })

  describe('POST /api/v1/example', () => {
    const METHOD = 'post'
    const TYPE = 'create'

    testLanguages.forEach(LANGUAGE => {
      it(`should be able to create a new example in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: ENDPOINT,
          data: VALID_INPUT,
          language: LANGUAGE,
          headers: { 'X-Custom-Header': 'test' }
        })

        expect(response.status).toBe(201)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: TYPE,
            key: SINGULAR_KEY,
            language: LANGUAGE
          })
        )
        expect(response.body.data.example).toBeDefined()
      })

      it(`should not be able to create a new example with empty input in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: ENDPOINT,
          data: EMPTY_INPUT,
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(3)
        expect(response.body.errors[0].message).toBe(
          getErrorValidationRequiredMessage('key1', LANGUAGE)
        )
        expect(response.body.errors[1].message).toBe(
          getErrorValidationRequiredMessage('key2', LANGUAGE)
        )
        expect(response.body.errors[2].message).toBe(
          getErrorValidationRequiredMessage('key3', LANGUAGE)
        )
      })

      it(`should not be able to create a new example with invalid input in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: ENDPOINT,
          data: INVALID_INPUT,
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(3)
        expect(response.body.errors[0].message).toBe(
          getErrorValidationInvalidTypeMessage('key1', LANGUAGE)
        )
        expect(response.body.errors[1].message).toBe(
          getErrorValidationInvalidTypeMessage('key2', LANGUAGE)
        )
        expect(response.body.errors[2].message).toBe(
          getErrorValidationInvalidTypeMessage('key3', LANGUAGE)
        )
      })
    })
  })

  describe('GET /api/v1/example/:id', () => {
    const METHOD_OR_TYPE = 'get'

    testLanguages.forEach(LANGUAGE => {
      it(`should be able to get a single example in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: `${ENDPOINT}/${EXAMPLE_ID}`,
          language: LANGUAGE
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: METHOD_OR_TYPE,
            key: SINGULAR_KEY,
            language: LANGUAGE
          })
        )
        expect(response.body.data.example).toBeDefined()
      })
    })
  })

  describe('PUT /api/v1/example/:id', () => {
    const METHOD = 'put'
    const TYPE = 'update'

    testLanguages.forEach(LANGUAGE => {
      it(`should be able to update a single example in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: `${ENDPOINT}/${EXAMPLE_ID}`,
          data: UPDATED_INPUT,
          language: LANGUAGE
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: TYPE,
            key: SINGULAR_KEY,
            language: LANGUAGE
          })
        )
        expect(response.body.data.example).toBeDefined()
      })

      it(`should not be able to update a single example with empty input in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: `${ENDPOINT}/${EXAMPLE_ID}`,
          data: EMPTY_INPUT,
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(3)
        expect(response.body.errors[0].message).toBe(
          getErrorValidationRequiredMessage('key1', LANGUAGE)
        )
        expect(response.body.errors[1].message).toBe(
          getErrorValidationRequiredMessage('key2', LANGUAGE)
        )
        expect(response.body.errors[2].message).toBe(
          getErrorValidationRequiredMessage('key3', LANGUAGE)
        )
      })

      it(`should not be able to update a single example with invalid input in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD,
          url: `${ENDPOINT}/${EXAMPLE_ID}`,
          data: INVALID_INPUT,
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(3)
        expect(response.body.errors[0].message).toBe(
          getErrorValidationInvalidTypeMessage('key1', LANGUAGE)
        )
        expect(response.body.errors[1].message).toBe(
          getErrorValidationInvalidTypeMessage('key2', LANGUAGE)
        )
        expect(response.body.errors[2].message).toBe(
          getErrorValidationInvalidTypeMessage('key3', LANGUAGE)
        )
      })
    })
  })

  describe('DELETE /api/v1/example', () => {
    const METHOD_OR_TYPE = 'delete'
    const EXAMPLE_VALID_IDS = [
      'id-this-is-just-for-dummy-demo-1',
      'id-this-is-just-for-dummy-demo-2',
      'id-this-is-just-for-dummy-demo-3',
      'id-this-is-just-for-dummy-demo-4',
      'id-this-is-just-for-dummy-demo-5'
    ]
    const EXAMPLE_EMPTY_IDS = ['', '', '', '', '']
    const EXAMPLE_INVALID_IDS = [1, 2, 3, 4, 5]

    testLanguages.forEach(LANGUAGE => {
      it(`should be able to delete examples in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: ENDPOINT,
          data: { ids: EXAMPLE_VALID_IDS },
          language: LANGUAGE
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toBe(
          getSuccessDataResourceMessage({
            type: METHOD_OR_TYPE,
            key: PLURAL_KEY,
            language: LANGUAGE
          })
        )
      })

      it(`should not be able to delete examples with empty IDs in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: ENDPOINT,
          data: { ids: EXAMPLE_EMPTY_IDS },
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(5)
        response.body.errors.forEach(error => {
          expect(error.message).toBe(
            getErrorValidationRequiredMessage('IDs', LANGUAGE)
          )
        })
      })

      it(`should not be able to delete examples with invalid IDs in ${LANGUAGE} language`, async () => {
        const response = await makeRequest({
          method: METHOD_OR_TYPE,
          url: ENDPOINT,
          data: { ids: EXAMPLE_INVALID_IDS },
          language: LANGUAGE
        })

        expect(response.status).toBe(422)
        expect(response.body.status).toBe('error')
        expect(response.body.message).toBe(
          getErrorUnprocessableEntityMessage(LANGUAGE)
        )
        expect(response.body.errors).toHaveLength(5)
        response.body.errors.forEach(error => {
          expect(error.message).toBe(
            getErrorValidationInvalidTypeMessage('IDs', LANGUAGE)
          )
        })
      })
    })
  })
})

/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, mock, beforeEach } from 'bun:test'
import {
  getNamespaces,
  parseLanguageHeader
} from '../../../src/utils/i18n.util'

const mockFs = {
  existsSync: mock((_path: string) => false),
  readdirSync: mock((_path: string) => [] as string[])
}

mock.module('fs', () => mockFs)

describe('i18n Utility Functions', () => {
  const testFiles = [
    'common.json',
    'errors.json',
    'resource.json',
    'validation.json'
  ]

  beforeEach(() => {
    mockFs.existsSync.mockReset()
    mockFs.readdirSync.mockReset()
  })

  describe('getNamespaces', () => {
    describe('when locales exist', () => {
      it('returns deduplicated sorted namespaces for supported languages', () => {
        mockFs.existsSync.mockImplementation(
          (path: string) =>
            path === './src/locales/en' || path === './src/locales/id'
        )

        mockFs.readdirSync.mockImplementation((path: string) =>
          path === './src/locales/en' || path === './src/locales/id'
            ? testFiles
            : []
        )

        expect(getNamespaces(['en', 'id'])).toEqual([
          'common',
          'errors',
          'resource',
          'validation'
        ])
      })

      it('ignores unsupported languages', () => {
        mockFs.existsSync.mockImplementation(
          (path: string) => path === './src/locales/en'
        )

        mockFs.readdirSync.mockImplementation((path: string) =>
          path === './src/locales/en' ? testFiles : []
        )

        expect(getNamespaces(['en', 'fr'])).toEqual([
          'common',
          'errors',
          'resource',
          'validation'
        ])
      })
    })

    describe('edge cases', () => {
      it('returns empty array for no supported languages', () =>
        expect(getNamespaces([])).toEqual([]))

      it('returns empty array when no JSON files found', () => {
        mockFs.existsSync.mockImplementation(() => true)
        mockFs.readdirSync.mockImplementation(() => [])

        expect(getNamespaces(['en'])).toEqual([])
      })

      it('handles missing locale directories gracefully', () => {
        mockFs.existsSync.mockImplementation(() => false)

        expect(getNamespaces(['en', 'id'])).toEqual([])
      })
    })
  })

  describe('parseLanguageHeader', () => {
    it('should return the primary language from a single language header', () => {
      const header = 'en-US'
      expect(parseLanguageHeader(header)).toBe('en-us')
    })

    it('should return the primary language from a complex language header', () => {
      const header = 'fr-CH, fr;q=0.9, en;q=0.8'
      expect(parseLanguageHeader(header)).toBe('fr-ch')
    })

    it('should handle whitespace in the header', () => {
      const header = '  es-MX , en;q=0.8 '
      expect(parseLanguageHeader(header)).toBe('es-mx')
    })

    it('should return null for an empty header', () => {
      const header = ''
      expect(parseLanguageHeader(header)).toBeNull()
    })

    it('should return null for a malformed header', () => {
      const header = ',,,'
      expect(parseLanguageHeader(header)).toBeNull()
    })

    it('should handle headers with no quality values', () => {
      const header = 'de-DE, en'
      expect(parseLanguageHeader(header)).toBe('de-de')
    })

    it('should handle headers with only quality values', () => {
      const header = 'en;q=1.0, fr;q=0.9'
      expect(parseLanguageHeader(header)).toBe('en')
    })

    it('should handle uppercase language codes', () => {
      const header = 'ZH-TW, en;q=0.8'
      expect(parseLanguageHeader(header)).toBe('zh-tw')
    })

    it('should handle nullish input gracefully', () => {
      const header = null as unknown as string
      expect(parseLanguageHeader(header)).toBeNull()
    })
  })
})

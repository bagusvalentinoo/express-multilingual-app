import { describe, it, expect, mock, jest, beforeEach } from 'bun:test'
import { existsSync, readdirSync } from 'fs'

import { getNamespaces } from '../../../src/utils/i18n.util'

mock.module('fs', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn()
}))

describe('getNamespaces', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('should return sorted and deduplicated namespaces for supported languages', () => {
    // Mock the file system
    ;(existsSync as jest.Mock).mockImplementation((path: string) => {
      return path === './src/locales/en' || path === './src/locales/id'
    })
    ;(readdirSync as jest.Mock).mockImplementation((path: string) => {
      if (path === './src/locales/en')
        return [
          'common.json',
          'errors.json',
          'resource.json',
          'validation.json'
        ]
      if (path === './src/locales/id')
        return [
          'common.json',
          'errors.json',
          'resource.json',
          'validation.json'
        ]

      return []
    })

    const supportedLanguages = ['en', 'id']
    const result = getNamespaces(supportedLanguages)

    expect(result).toEqual(['common', 'errors', 'resource', 'validation'])
  })

  it('should return an empty array if no supported languages are provided', () => {
    const supportedLanguages: string[] = []
    const result = getNamespaces(supportedLanguages)

    expect(result).toEqual([])
  })

  it('should return an empty array if no JSON files are found in the locales directory', () => {
    // Mock the file system
    ;(existsSync as jest.Mock).mockReturnValue(true)
    ;(readdirSync as jest.Mock).mockReturnValue([])

    const supportedLanguages = ['en']
    const result = getNamespaces(supportedLanguages)

    expect(result).toEqual([])
  })

  it('should ignore unsupported languages', () => {
    // Mock the file system
    ;(existsSync as jest.Mock).mockImplementation((path: string) => {
      return path === './src/locales/en'
    })
    ;(readdirSync as jest.Mock).mockImplementation((path: string) => {
      if (path === './src/locales/en')
        return [
          'common.json',
          'errors.json',
          'resource.json',
          'validation.json'
        ]

      return []
    })

    const supportedLanguages = ['en', 'fr'] // 'fr' is unsupported
    const result = getNamespaces(supportedLanguages)

    expect(result).toEqual(['common', 'errors', 'resource', 'validation'])
  })

  it('should handle missing locale directories gracefully', () => {
    // Mock the file system
    ;(existsSync as jest.Mock).mockReturnValue(false)

    const supportedLanguages = ['en', 'id']
    const result = getNamespaces(supportedLanguages)

    expect(result).toEqual([])
  })
})

import fs from 'fs'
import { join } from 'path'

/**
 * Supported language codes as read-only array
 */
export const SUPPORTED_LANGUAGES = ['en', 'id'] as const

/**
 * Default language code used as fallback
 */
export const DEFAULT_LANGUAGE = 'en' as const

/**
 * Memoized function to get unique namespaces from all language directories
 * @type {() => string[]}
 */
export const getNamespaces: () => string[] = ((): (() => string[]) => {
  let cache: string[] | null = null
  const localesBasePath = join(__dirname, '../../locales')

  return () => {
    if (cache) return cache

    /** @type {string[]} */
    const allNamespaces: string[] = SUPPORTED_LANGUAGES.flatMap(language => {
      const languagePath = join(localesBasePath, language)

      return fs.existsSync(languagePath)
        ? fs
            .readdirSync(languagePath)
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace(/\.json$/, ''))
        : []
    })

    // Deduplicate, sort, and cache the result
    cache = [...new Set(allNamespaces)].sort()
    return cache
  }
})()

/**
 * Pre-computed list of unique namespaces
 * @type {string[]}
 */
export const NAMESPACES: string[] = getNamespaces()

export const DEFAULT_NAMESPACE = 'common' as const

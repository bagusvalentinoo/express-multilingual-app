import { existsSync, readdirSync } from 'fs'

import { SUPPORTED_LANGUAGES } from '@/constants/config/i18n.constant'

/**
 * Retrieves the namespaces from the locales directory.
 *
 * @returns {string[]} An array of unique, sorted namespace names.
 */
export const getNamespaces = (): string[] => {
  // Map over supported languages and collect namespaces
  const allNamespaces = SUPPORTED_LANGUAGES.flatMap(language => {
    const languagePath = `./src/locales/${language}`

    // Check if the language directory exists
    if (!existsSync(languagePath)) return []

    const files = readdirSync(languagePath)
      .filter(file => file.endsWith('.json')) // Filter only JSON files
      .map(file => file.replace(/\.json$/, '')) // Remove the `.json` extension

    // Read all JSON files in the directory
    return files
  })

  // Deduplicate and sort the namespaces
  return Array.from(new Set(allNamespaces)).sort()
}

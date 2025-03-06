import { existsSync, readdirSync } from 'fs'

/**
 * Retrieves the namespaces from the locales directory.
 *
 * @param {string[]} supportedLanguages - The supported languages
 *
 * @returns {string[]} An array of unique, sorted namespace names.
 */
export const getNamespaces = (
  supportedLanguages: readonly string[]
): string[] => {
  // Map over supported languages and collect namespaces
  const allNamespaces = supportedLanguages.flatMap(language => {
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

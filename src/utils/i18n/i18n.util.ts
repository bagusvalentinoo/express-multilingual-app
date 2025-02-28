import { existsSync, readdirSync } from 'fs'

import { SUPPORTED_LANGUAGES } from '@/constants/config/i18n.constant'
import type { ParsedLocalization } from '@/types/i18n/i18n.type'

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

/**
 * Parses a localization string into an object.
 *
 * @param {string} input - The localization string to parse.
 *
 * @returns {ParsedLocalization} The parsed localization object.
 *
 * @throws {Error} If the input format is invalid.
 *
 * @example
 * ```ts
 * const parsed = parseLocalizationString('ns:common,key:hello,params:name=John,age=30')
 * console.log(parsed) // { ns: 'common', key: 'hello', params: { name: 'John', age: '30' } }
 * ```
 */
export const parseLocalizationString = (input: string): ParsedLocalization => {
  // Validate input
  if (
    !input.includes('ns:') ||
    !input.includes('key:') ||
    !input.includes('params:')
  )
    throw new Error(
      'Invalid input format. Expected format: "ns:<namespace>,key:<key>,params:<key>=<value>,..."'
    )

  const [nsPart, keyPart, paramsPart] = input.split(',') // Split the input into parts
  const nsMatch = nsPart?.match(/^ns:(.+)$/) // Extract namespace

  // Use type guard to ensure nsMatch is not null
  if (!nsMatch)
    throw new Error('Invalid namespace format. Expected "ns:<namespace>"')

  const ns = nsMatch[1] // Extract namespace

  // Use type guard to ensure ns is treated as a string
  if (typeof ns !== 'string')
    throw new Error('Unexpected type for namespace. Expected a string.')

  const keyMatch = keyPart?.match(/^key:(.+)$/) // Extract key

  // Use type guard to ensure keyMatch is not null
  if (!keyMatch) throw new Error('Invalid key format. Expected "key:<key>"')

  const key = keyMatch[1] // Extract key

  // Use type guard to ensure key is treated as a string
  if (typeof key !== 'string')
    throw new Error('Unexpected type for key. Expected a string.')

  const paramsMatch = paramsPart?.match(/^params:(.+)$/) // Extract params

  // Use type guard to ensure paramsMatch is not null
  if (!paramsMatch)
    throw new Error(
      'Invalid params format. Expected "params:<key>=<value>,..."'
    )

  const paramsRaw = paramsMatch[1] // Extract params
  const paramsArray = paramsRaw?.split(',') // Split params
  const params: Record<string, string> = {} // Change params to object

  for (const param of paramsArray ?? []) {
    const [paramKey, paramValue] = param.split('=') // Split params

    // Validate param key
    if (paramKey === null || paramKey === '')
      throw new Error(
        `Invalid param format. Expected "<key>=<value>", got "${param}"`
      )

    // Validate param value
    if (paramValue === null || paramValue === '')
      throw new Error(
        `Invalid param format. Expected "<key>=<value>", got "${param}"`
      )

    // Use type guard to ensure paramKey is treated as a string
    if (typeof paramKey !== 'string')
      throw new Error(`Unexpected type for paramKey: ${paramKey}`)

    // Use type guard to ensure paramValue is treated as a string
    if (typeof paramValue !== 'string')
      throw new Error(`Unexpected type for paramValue: ${paramValue}`)

    // Add param key-value pair to params object
    params[paramKey as string] = paramValue
  }

  // Return the parsed localization object
  return { ns, key, params }
}

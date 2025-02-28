/**
 * Parsed localization object
 *
 * key: The key of the localization
 * ns: The namespace of the localization
 * params: The params of the localization
 */
export type ParsedLocalization = {
  key: string
  ns: string
  params: Record<string, string>
}

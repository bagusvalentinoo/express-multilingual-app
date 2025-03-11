import { getNamespaces } from '@/utils/i18n.util'

/**
 * Supported language codes as read-only array
 */
export const SUPPORTED_LANGUAGES = ['en', 'id'] as const

/**
 * Default language code used as fallback
 */
export const DEFAULT_LANGUAGE = 'en' as const

/**
 * The namespaces
 */
export const NAMESPACES: string[] = getNamespaces(SUPPORTED_LANGUAGES)

/**
 * The default namespace
 */
export const DEFAULT_NAMESPACE = 'common' as const

import { t } from '@/lib/i18n/i18n'

/**
 * Get required error message
 *
 * @param {string} field - Field name
 *
 * @returns {string} Required error message
 */
export const getRequiredErrorMessage = (field: string): string =>
  t('required', { ns: 'validation', field })

/**
 * Get invalid type error message
 *
 * @param {string} field - Field name
 *
 * @returns {string} Invalid type error message
 */
export const getInvalidTypeErrorMessage = (field: string): string =>
  t('invalid_type', { ns: 'validation', field })

/**
 * Get minimum items error message
 *
 * @param {string} field - Field name
 * @param {number} minItems - Minimum items
 *
 * @returns {string} Minimum items error message
 */
export const getMinItemsErrorMessage = (
  field: string,
  minItems: number
): string => t('min_items', { ns: 'validation', field, min: minItems })

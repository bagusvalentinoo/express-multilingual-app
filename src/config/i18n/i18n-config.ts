import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'path'

import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  DEFAULT_NAMESPACE
} from '@/constant/config/i18n'
import logger from '@/utils/logger'

// Initialize i18next
i18next.use(Backend).init({
  lng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  ns: NAMESPACES,
  defaultNS: DEFAULT_NAMESPACE,
  saveMissing: process.env.NODE_ENV === 'development',
  updateMissing: process.env.NODE_ENV === 'development',
  missingKeyHandler: (lngs, ns, key, fallbackValue) => {
    if (process.env.NODE_ENV === 'development')
      logger.error(`Missing translation: [${lngs}] ${ns}:${key}`)

    return fallbackValue || key
  },
  parseMissingKeyHandler: key => {
    return `MISSING::${key}`
  },
  backend: {
    loadPath: join('./src/locales', '{{lng}}', '{{ns}}.json')
  },
  fallbackLng: DEFAULT_LANGUAGE,
  preload: SUPPORTED_LANGUAGES
})

// Export the i18next instance
export default i18next

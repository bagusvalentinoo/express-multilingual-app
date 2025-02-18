import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'path'

import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  DEFAULT_NAMESPACE
} from '@/constants/config/i18n.constant'

// Export the i18next instance
export default i18next.use(Backend).init({
  debug: process.env.NODE_ENV === 'development',
  lng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  ns: NAMESPACES,
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: true
  },
  backend: {
    loadPath: join('./src/locales', '{{lng}}', '{{ns}}.json')
  },
  fallbackLng: DEFAULT_LANGUAGE,
  preload: SUPPORTED_LANGUAGES
})

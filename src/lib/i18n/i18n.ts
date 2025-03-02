import i18next from 'i18next'
import Backend, { type FsBackendOptions } from 'i18next-fs-backend'

import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  DEFAULT_NAMESPACE
} from '@/constants/config/i18n.constant'

// Initialize i18next
// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next.use(Backend).init<FsBackendOptions>({
  lng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  ns: NAMESPACES,
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: true
  },
  backend: {
    loadPath: './src/locales/{{lng}}/{{ns}}.json'
  },
  fallbackLng: DEFAULT_LANGUAGE,
  preload: SUPPORTED_LANGUAGES
})

// Export the i18next instance
export default i18next

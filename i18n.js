import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import locales, { DEFAULT_LANGUAGE } from 'locales'

export default i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  })

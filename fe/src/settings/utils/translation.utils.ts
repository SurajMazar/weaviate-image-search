import translate from 'i18next'
import { initReactI18next } from 'react-i18next'
import EngTranslations from '@/lang/en.json'
import AppConfig from '@/settings/config/app.config'

/**
 * AVAILABLE TRANSLATIONS
 */
const resources = {
  en: {
    translation: EngTranslations,
  },
}

/**
 * I18N INITIALIZATION
 */
translate.use(initReactI18next).init({
  resources,
  lng: AppConfig.default_lang,
  interpolation: {
    escapeValue: false,
  },
})

export default translate

import { I18n } from 'i18n-js'

import en from '../translations/en.json'
import ru from '../translations/ru.json'

const translations = { en, ru }

export default function Translate(locale) {
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true

  return function(str) {
    return i18n.t(str)
  }
}

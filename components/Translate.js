import { I18n }    from 'i18n-js'
import * as Consts from './Constants'

const translations = {}
for (const locale of Consts.LOCALES) {
  translations[locale] = require(`../translations/${locale}.json`)
}

export default function Translate(locale) {
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true

  return function(str) {
    return i18n.t(str)
  }
}

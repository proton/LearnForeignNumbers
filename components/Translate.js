import { I18n } from 'i18n-js'
import de       from '../translations/de.json'
import en       from '../translations/en.json'
import es       from '../translations/es.json'
import it       from '../translations/it.json'
import ru       from '../translations/ru.json'
import uk       from '../translations/uk.json'
import zh_CN    from '../translations/zh_CN.json'
import zh_TW    from '../translations/zh_TW.json'

const translations = { de, en, es, it, ru, uk, zh_CN, zh_TW }

export default function Translate(locale) {
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true

  return function(str) {
    return i18n.t(str)
  }
}

import AsyncStorage   from '@react-native-async-storage/async-storage'
import EventBus       from 'just-event-bus'
import { getLocales } from 'expo-localization'

import * as Consts from './Constants'

const configKey = 'settings'

const defaultConfig = {
  minNumber:   0,
  maxNumber:   1000,
  language:    'en',
  showAnswer:  false,
  firstLaunch: true,
  theme:       '',
  muted:       false,
}

class Config {
  static load() {
    AsyncStorage.getItem(configKey).then(jsonValue => {
      const loadedConfig = jsonValue ? JSON.parse(jsonValue) : {}
      const config = { ...defaultConfig, ...loadedConfig }
      if (!config.locale) config.locale = this.findLocale()

      EventBus.emit('prefsLoaded', config)
    })
  }

  static async save(config) {
    const jsonValue = JSON.stringify(config)
    await AsyncStorage.setItem(configKey, jsonValue)
  }

  static findLocale() {
    const supportedLocales = Consts.LOCALES.map(l => l.value)
    const systemLocales = getLocales().map(l => l.languageCode)
    return systemLocales.find(locale => supportedLocales.includes(locale)) || 'en'
  }
}

export default Config

import AsyncStorage from '@react-native-async-storage/async-storage'
import EventBus     from 'just-event-bus'

const configKey = 'settings'

const defaultConfig = {
  minNumber:   0,
  maxNumber:   1000,
  language:    'en',
  showAnswer:  false,
  firstLaunch: true,
  theme:       '',
}

class Config {
  static load() {
    AsyncStorage.getItem(configKey).then(jsonValue => {
      const loadedConfig = jsonValue ? JSON.parse(jsonValue) : {}
      const config = { ...defaultConfig, ...loadedConfig }
      EventBus.emit('prefsLoaded', config)
    })
  }

  static async save(config) {
    const jsonValue = JSON.stringify(config)
    await AsyncStorage.setItem(configKey, jsonValue)
  }
}

export default Config

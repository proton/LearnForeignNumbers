import { useState, useEffect }             from 'react'
import { StatusBar }                       from 'expo-status-bar'
import { StyleSheet, View, useColorScheme} from 'react-native'
import EventBus                            from 'just-event-bus'
import * as Speech                         from 'expo-speech'
import * as ScreenOrientation              from 'expo-screen-orientation'

import Config   from './components/Config'
import About    from './components/About'
import Game     from './components/Game'
import Settings from './components/Settings'

import lightThemeStyle from './themes/light'
import darkThemeStyle  from './themes/dark'

const themeStyle = theme => theme === 'dark' ? darkThemeStyle : lightThemeStyle

export default function App() {
  const [prefs, setPrefs] = useState({})
  const [view, setView] = useState('')
  const [voices, setVoices] = useState([])
  const prefsLoaded = !!Object.keys(prefs).length
  const voicesLoaded = voices.length > 0

  const theme = prefs.theme || useColorScheme()
  const enchantedPrefs = {
    ...prefs,
    styles: themeStyle(theme),
    theme:  theme,
  }

  const saveSettings = function(settings) {
    const newPrefs = { ...prefs, ...settings, firstLaunch: false }
    setPrefs(newPrefs)
    Config.save(newPrefs)
  }

  const loadVoices = async _ => {
    if (voicesLoaded) return
    Speech.getAvailableVoicesAsync().then(newVoices => {
      if (newVoices.length === 0) loadVoices()
      else setVoices(newVoices)
    })
  }

  useEffect(_ => {
    ScreenOrientation.unlockAsync()

    EventBus.on('prefsLoaded', setPrefs)
    EventBus.on('openAbout', _ => setView('about'))
    EventBus.on('openGame', _ => setView('game'))
    EventBus.on('openSettings', _ => setView('settings'))

    if (view === '' && prefsLoaded && voicesLoaded) {
      setView(prefs.firstLaunch ? 'settings' : 'game')
    }

    if (!prefsLoaded) Config.load()
    if (!voicesLoaded) loadVoices()
  })

  return (
    <View style={{ ...styles.container, ...enchantedPrefs.styles.app }}>
      <StatusBar style="auto" />
      {view === 'about' && <About prefs={enchantedPrefs} />}
      {view === 'game' && <Game prefs={enchantedPrefs} saveSettings={saveSettings} />}
      {view === 'settings' && <Settings prefs={enchantedPrefs} voices={voices} saveSettings={saveSettings} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    flex:           1,
    flexGrow:       1,
    flexShrink:     0,
    justifyContent: 'center',
    maxHeight:      '100%',
    paddingTop:     StatusBar.currentHeight || 35,
  },
})

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

const settingsTextStyle = theme => ({
  color: theme === 'dark' ? '#aaa' : '#111',
})

export default function App() {
  const [prefs, setPrefs] = useState({})
  const [view, setView] = useState('')
  const [voices, setVoices] = useState([])
  const prefsLoaded = !!Object.keys(prefs).length
  const voicesLoaded = voices.length > 0

  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const enchantedSetPrefs = config => {
    config.styles = {
      settingsText: settingsTextStyle(config.theme),
    }
    setPrefs(config)
  }

  const saveSettings = function(settings) {
    const newPrefs = { ...prefs, ...settings, firstLaunch: false }
    enchantedSetPrefs(newPrefs)
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

    EventBus.on('prefsLoaded', enchantedSetPrefs)
    EventBus.on('openAbout', _ => setView('about'))
    EventBus.on('openGame', _ => setView('game'))
    EventBus.on('openSettings', _ => setView('settings'))

    if (view === '' && prefsLoaded && voicesLoaded) {
      setView(prefs.firstLaunch ? 'settings' : 'game')
    }

    if (!prefsLoaded) Config.load()
    if (!voicesLoaded) loadVoices()
  })

  const backgroundColor = theme === 'dark' ? '#121212' : '#eee'

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <StatusBar style="auto" />
      {view === 'about' && <About prefs={prefs} />}
      {view === 'game' && <Game prefs={prefs} saveSettings={saveSettings} />}
      {view === 'settings' && <Settings prefs={prefs} voices={voices} saveSettings={saveSettings} />}
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

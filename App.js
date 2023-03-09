import { useState, useEffect }             from 'react'
import { StatusBar }                       from 'expo-status-bar'
import { StyleSheet, View, useColorScheme} from 'react-native'
import EventBus                            from 'just-event-bus'
import * as Speech                         from 'expo-speech'

import Config   from './components/Config'
import Game     from './components/Game'
import Settings from './components/Settings'

export default function App() {
  const [prefs, setPrefs] = useState({})
  const [view, setView] = useState('')
  const [voices, setVoices] = useState([])
  const prefsLoaded = !!Object.keys(prefs).length
  const voicesLoaded = voices.length > 0

  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

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
    EventBus.on('prefsLoaded', setPrefs)
    EventBus.on('openSettings', _ => setView('settings'))
    EventBus.on('closeSettings', _ => setView('game'))

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
      {view === 'game' && <Game prefs={prefs} />}
      {view === 'settings' && <Settings prefs={prefs} voices={voices} saveSettings={saveSettings} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 35,
    maxHeight: '100%',
  },
})

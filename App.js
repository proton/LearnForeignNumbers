import { useState, useEffect }             from 'react'
import { StatusBar }                       from 'expo-status-bar'
import { StyleSheet, View, useColorScheme} from 'react-native'
import EventBus                            from 'just-event-bus'

import Config   from './components/Config'
import Game     from './components/Game'
import Settings from './components/Settings'

export default function App() {
  const [prefs, setPrefs] = useState({})
  const [view, setView] = useState('')
  const prefsLoaded = !!Object.keys(prefs).length

  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const saveSettings = function(settings) {
    const newPrefs = { ...prefs, ...settings, firstLaunch: false }
    setPrefs(newPrefs)
    Config.save(newPrefs)
  }

  useEffect(_ => {
    EventBus.on('prefsLoaded', setPrefs)
    EventBus.on('openSettings', _ => setView('settings'))
    EventBus.on('closeSettings', _ => setView('game'))

    if (view === '' && prefsLoaded) {
      setView(prefs.firstLaunch ? 'settings' : 'game')
    }

    if (!prefsLoaded) Config.load()
  })

  const backgroundColor = theme === 'dark' ? '#121212' : '#eee'

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <StatusBar style="auto" />
      {view === 'game' && <Game prefs={prefs} />}
      {view === 'settings' && <Settings prefs={prefs} saveSettings={saveSettings} />}
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

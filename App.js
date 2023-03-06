import { useState, useEffect } from 'react'
import { StatusBar }           from 'expo-status-bar'
import { StyleSheet, View }    from 'react-native'
import EventBus                from 'just-event-bus'

import Config   from './components/Config'
import Game     from './components/Game'
import Settings from './components/Settings'

export default function App() {
  const [prefs, setPrefs] = useState()
  const [view, setView] = useState('')

  const saveSettings = function(settings) {
    const newPrefs = { ...prefs, ...settings, firstLaunch: false }
    setPrefs(newPrefs)
    Config.save(newPrefs)
  }

  useEffect(_ => {
    EventBus.on('prefsLoaded', prefs => {
      setPrefs(prefs)
      setView('settings')
      // setView(prefs.firstLaunch ? 'settings' : 'game')
    })
    EventBus.on('openSettings', _ => setView('settings'))
    EventBus.on('closeSettings', _ => setView('game'))

    if (!prefs) Config.load()
  })

  return (
    <View style={styles.container}>
      {view === 'game' && <Game prefs={prefs} />}
      {view === 'settings' && <Settings prefs={prefs} saveSettings={saveSettings} />}
      <StatusBar style="auto" />
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
  },
})

// import { Provider as BusProvider, useBus, useListener } from 'react-bus'
import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import EventBus from './components/EventBus'
import Game     from './components/Game'
import Settings from './components/Settings'

export default function App() {
  // if settings set?
  const [view, setView] = useState('settings')

  // const [bus, _] = useState(useBus())
  // const bus = useBus()
  useEffect(_ => {
    EventBus.getInstance().on('openSettings',  _ => setView('settings'))
    EventBus.getInstance().on('closeSettings', _ => setView('game'))

    //if (number === null) changeNumber()

    // console.log([123, bus])

    // const fff = _ => setView('settings')
    // bus.on('openSettings',  fff)
    // return () => {
    //   bus.off('openSettings', fff)
    // }
  })



  // useListener('openSettings',  function() { setView('settings') })
  // useListener('closeSettings', function() { setView('game') })

  return (
    <View style={styles.container}>
      {view === 'game' && <Game />}
      {view === 'settings' && <Settings />}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    flexShrink: 0,
    flexGrow: 1,
  },
})

import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

// import Game from './components/Game'
import Settings from './components/Settings'

export default function App() {
  const [currentView, setCurrentView] = useState('settings')
  return (
    <View style={styles.container}>
      <Settings></Settings>
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

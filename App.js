import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import Button from './components/Button'

export default function App() {
  const [number, setNumber] = useState(null)

  const changeNumber = _ => {
    const d = Math.random()
    if (d < 1/3) setNumber(Math.floor(Math.random() * 10))
    if (d < 2/3) setNumber(Math.floor(Math.random() * 100))
    else         setNumber(Math.floor(Math.random() * 1001))
  }

  useEffect(() => {
    if (number === null) changeNumber()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <View style={styles.footerContainer}>
        <Button label="Show" />
        <Button label="Next" onPress={changeNumber} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  number: {
    fontSize: PixelRatio.get() * 40,
  },
})

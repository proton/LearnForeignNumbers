import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import { GestureHandlerRootView, TapGestureHandler, FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'
import * as Speech from 'expo-speech'

import Button from './components/Button'

export default function App() {
  const [number, setNumber] = useState(null)

  const changeNumber = _ => {
    const d = Math.random()
    if (d < 1/3) setNumber(Math.floor(Math.random() * 10))
    if (d < 2/3) setNumber(Math.floor(Math.random() * 100))
    else         setNumber(Math.floor(Math.random() * 1001))
  }

  const showAnswer = _ => {
    Speech.speak(number.toString())
  }

  const onTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) showAnswer()
  }

  const onSwipe = event => {
    if (event.nativeEvent.state === State.ACTIVE) changeNumber()
  }

  useEffect(() => {
    if (number === null) changeNumber()
  })

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <FlingGestureHandler
          direction={Directions.RIGHT | Directions.LEFT}
          onHandlerStateChange={onSwipe}
        >
          <View style={styles.internalContainer}>
            <TapGestureHandler onHandlerStateChange={onTap}>
              <Text style={styles.number}>{number}</Text>
            </TapGestureHandler>
            <View style={styles.footerContainer}>
              <Button label="Show answer" onPress={showAnswer} />
              <Button label="Next" onPress={changeNumber} />
            </View>
            <StatusBar style="auto" />
          </View>
        </FlingGestureHandler>
      </GestureHandlerRootView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    flexShrink: 0,
    flexGrow: 1,
  },
  internalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
    width: '100%',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  number: {
    fontSize: PixelRatio.get() * 40,
    textAlign: 'center',
  },
})

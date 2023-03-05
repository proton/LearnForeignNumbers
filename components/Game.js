import { useState, useEffect }                                                               from 'react'
import { StyleSheet, Text, View, PixelRatio, Button }                                        from 'react-native'
import { GestureHandlerRootView, TapGestureHandler, FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'
import n2words                                                                               from 'n2words'
import * as Speech                                                                           from 'expo-speech'
import EventBus                                                                              from 'just-event-bus'

export default function Game(props) {
  const { prefs } = props

  const [number, setNumber] = useState(null)
  const [numberText, setNumberText] = useState('')

  const changeNumber = _ => {
    const newNumber = Math.floor(Math.random() * (prefs.maxNumber - prefs.minNumber + 1)) + prefs.minNumber
    setNumber(newNumber)

    // const d = Math.random()
    // if (d < 1/3) setNumber(Math.floor(Math.random() * 10)) // 0-9
    // if (d < 2/3) setNumber(Math.floor(Math.random() * 100)) // 0-100
    // else setNumber(Math.floor(Math.random() * 1001)) // 0-1000

    if (prefs.showAnswer) showAnswer()
    else setNumberText('')
  }

  const showAnswer = _ => {
    if (!number) return

    setNumberText(n2words(number, {lang: prefs.language}))
    Speech.stop()
    Speech.speak(number.toString(), { language: prefs.language })
  }

  const openSettings = _ => {
    EventBus.emit('openSettings')
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
    <GestureHandlerRootView style={styles.container}>
      <FlingGestureHandler
        direction={Directions.RIGHT | Directions.LEFT}
        onHandlerStateChange={onSwipe}
      >
        <View style={styles.internalContainer}>
          <Button title="settings" onPress={openSettings}/>
          <TapGestureHandler onHandlerStateChange={onTap}>
            <Text style={styles.number}>{number}</Text>
          </TapGestureHandler>
          <Text style={styles.numberText}>{numberText}</Text>
          <View style={styles.footerContainer}>
            {!prefs.showAnswer && <Button title="Show answer" onPress={showAnswer} />}
            <Button title="Next" color="red" onPress={changeNumber} />
          </View>
        </View>
      </FlingGestureHandler>
    </GestureHandlerRootView>
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
    width: '100%',
  },
  number: {
    fontSize: PixelRatio.get() * 40,
    textAlign: 'center',
  },
  numberText: {
    fontSize: PixelRatio.get() * 18,
    textAlign: 'center',
    color: 'grey',
  },
})

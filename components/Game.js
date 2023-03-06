import { useState, useEffect }                                                               from 'react'
import { StyleSheet, Text, View, PixelRatio, Button }                                        from 'react-native'
import { GestureHandlerRootView, TapGestureHandler, FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'
import n2words                                                                               from 'n2words'
import * as Speech                                                                           from 'expo-speech'
import EventBus                                                                              from 'just-event-bus'

export default function Game(props) {
  const { prefs } = props
  const { minNumber, maxNumber, language } = prefs

  const [number, setNumber] = useState(null)
  const [numberText, setNumberText] = useState('')
  const [voice, setVoice] = useState(null)

  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const changeNumber = _ => {
    let newNumber
    if (minNumber === 0 && maxNumber > 0) {
      // make it gradual
      const l1 = minNumber.toString().length
      const l2 = (maxNumber - 1).toString().length // 1000 to 999
      const l = randomBetween(l1, l2)
      const max = Math.min(+'9'.repeat(l) + 1, maxNumber)

      newNumber = randomBetween(minNumber, max)
    } else {
      // TODO: improve me too!
      newNumber = randomBetween(minNumber, maxNumber)
    }
    setNumberText('')
    setNumber(newNumber)
  }

  const showAnswer = _ => {
    setNumberText(n2words(number, { lang: language }))
    if (voice) {
      Speech.stop()
      Speech.speak(number.toString(), { language: voice.name })
    }
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

  const findVoice = _ => {
    Speech.getAvailableVoicesAsync().then(voices => {
      setVoice(voices.find(voice => voice.language.startsWith(language)))
    })
  }

  useEffect(()=> {
    if (number && prefs.showAnswer) showAnswer()
  }, [number])

  useEffect(() => {
    if (number === null) changeNumber()
    if (!voice || !voice.language.startsWith(language)) findVoice()
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

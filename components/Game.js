import { useState, useEffect }                                                               from 'react'
import { StyleSheet, Text, View, PixelRatio, useColorScheme }                                from 'react-native'
import { GestureHandlerRootView, TapGestureHandler, FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'
import n2words                                                                               from 'n2words'
import * as Speech                                                                           from 'expo-speech'
import EventBus                                                                              from 'just-event-bus'

import Button from './Button'

export default function Game({ prefs }) {
  const { minNumber, maxNumber, language } = prefs
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

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
    const text = n2words(number, { lang: language })
    setNumberText(text)
    if (voice) {
      Speech.stop()
      Speech.speak(text, { language: voice.name })
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

  const numberColor = theme === 'dark' ? '#bebebe' : 'black'
  const numberTextColor = theme === 'dark' ? '#aaa' : 'grey'

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlingGestureHandler
        direction={Directions.RIGHT | Directions.LEFT}
        onHandlerStateChange={onSwipe}
      >
        <View style={styles.internalContainer}>
          <Button prefs={prefs} icon="settings" onPress={openSettings} color="grey" style={{ position: 'absolute', top: 10, right: 10 }}/>
          <TapGestureHandler onHandlerStateChange={onTap}>
            <Text style={{ ...styles.number, color: numberColor }}>{number}</Text>
          </TapGestureHandler>
          <Text style={{ ...styles.numberText, color: numberTextColor }}>{numberText}</Text>
          <View style={styles.footerContainer}>
            {!prefs.showAnswer && <Button prefs={prefs} title="Show answer" color="blue" onPress={showAnswer} />}
            <Button prefs={prefs} title="Next" color="red" onPress={changeNumber} />
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
    flexShrink: 0,
    flexGrow: 1,
  },
  internalContainer: {
    flex: 1,
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
  },
})

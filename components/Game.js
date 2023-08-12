import { useState, useEffect }                from 'react'
import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import GestureRecognizer                      from 'react-native-swipe-gestures'

import EventBus from 'just-event-bus'

import Translate  from './Translate'
import Button     from './Button'
import MuteButton from './MuteButton'
import Player     from './Player'

export default function Game({ prefs, saveSettings }) {
  const { minNumber, maxNumber, locale } = prefs

  const theme = prefs.computedTheme
  const numberColor = theme === 'dark' ? '#cfcfcf' : 'black'
  const numberTextColor = theme === 'dark' ? '#afafaf' : '#555'

  const player = new Player(prefs)

  const tr = Translate(locale)

  const [number, setNumber] = useState(null)
  const [numberText, setNumberText] = useState('')
  const [previousNumbers, setPreviousNumbers] = useState([])

  const randomBetween = (min, max) => {
    [min, max] = [min, max].sort((a, b) => a - b)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const generateNewNumber = _ => {
    if (minNumber === 0 && maxNumber > 0) {
      // make it gradual
      const l1 = minNumber.toString().length
      const l2 = (maxNumber - 1).toString().length // 1000 to 999
      const l = randomBetween(l1, l2)
      const max = Math.min(+'9'.repeat(l) + 1, maxNumber)

      return randomBetween(minNumber, max)
    } else {
      // TODO: improve me too!
      return randomBetween(minNumber, maxNumber)
    }
  }

  const changeNumber = _ => {
    if (number) setPreviousNumbers([...previousNumbers, number])
    let newNumber = number
    while (newNumber === number) newNumber = generateNewNumber()
    setNumber(newNumber)
    if (prefs.showAnswer) showAnswer(newNumber)
    else setNumberText('')
  }

  const pickPreviousNumber = _ => {
    if (previousNumbers.length === 0) {
      changeNumber()
      return
    }

    const oldNumber = previousNumbers.pop()
    setPreviousNumbers(previousNumbers)
    setNumber(oldNumber)
    showAnswer(oldNumber)
  }

  const showAnswer = number => {
    setNumberText(player.numberToText(number))
    player.sayNumber(number)
  }

  const openSettings = _ => {
    EventBus.emit('openSettings')
  }

  const openAbout = _ => {
    EventBus.emit('openAbout')
  }

  useEffect(() => {
    if (number === null) changeNumber()
  })

  return (
    <GestureRecognizer
      onSwipeLeft={changeNumber}
      onSwipeRight={pickPreviousNumber}
      style={styles.container}>
      <View style={styles.internalContainer}>
        <Button prefs={prefs} icon='Feather/settings' accessibilityLabel={tr('openSettings')} onPress={openSettings} color="grey" style={{ position: 'absolute', right: 15, top: 20 }}/>
        <Button prefs={prefs} icon='Feather/info' accessibilityLabel={tr('about')} onPress={openAbout} color="grey" style={{ position: 'absolute', right: 15, top: 80 }}/>
        { player.voiced() && <MuteButton prefs={prefs} saveSettings={saveSettings} style={{ position: 'absolute', right: 15, top: 140 }}/> }
        <Text style={{ ...styles.number, color: numberColor }} onPress={_ => showAnswer(number)}>{number}</Text>
        <Text style={{ ...styles.numberText, color: numberTextColor }}>{numberText}</Text>
        <View style={styles.footerContainer}>
          {!prefs.showAnswer && <Button prefs={prefs} title={tr('showAnswer')} color="blue" onPress={_ => showAnswer(number)} />}
          <Button prefs={prefs} title={tr('nextNumber')} color="red" onPress={changeNumber} />
        </View>
      </View>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    flex:           1,
    flexGrow:       1,
    flexShrink:     0,
    justifyContent: 'center',
    paddingTop:     5,
  },
  footerContainer: {
    alignItems:     'center',
    flex:           1 / 3,
    flexDirection:  'row',
    justifyContent: 'space-evenly',
    width:          '100%',
  },
  internalContainer: {
    alignItems:     'center',
    flex:           1,
    flexGrow:       1,
    flexShrink:     0,
    justifyContent: 'center',
    width:          '100%',
  },
  number: {
    fontSize:  PixelRatio.get() * 40,
    textAlign: 'center',
  },
  numberText: {
    fontSize:  PixelRatio.get() * 18,
    textAlign: 'center',
  },
})

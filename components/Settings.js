import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, PixelRatio, Button, ScrollView, Switch, Platform } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SettingsScreen } from 'react-native-settings-screen'
// import EventBus from 'just-event-bus'
import EventBus from 'just-event-bus'

export default function Settings() {
  const storageKey = 'settings'

  const [prefs,      setPrefs]      = useState({})
  const [minNumber,  setMinNumber]  = useState(0)
  const [maxNumber,  setMaxNumber]  = useState(1000)
  const [language,   setLanguage]   = useState('en')
  const [showAnswer, setShowAnswer] = useState(false)

  const loadSettings = async () => {
    const jsonValue = await AsyncStorage.getItem(storageKey)
    if (jsonValue == null) return
    setPrefs(JSON.parse(jsonValue))
    if (prefs.minNumber  != null) setMinNumber(prefs.minNumber)
    if (prefs.maxNumber  != null) setMaxNumber(prefs.maxNumber)
    if (prefs.language   != null) setLanguage(prefs.language)
    if (prefs.showAnswer != null) setShowAnswer(prefs.showAnswer)
  }

  const saveSettings = async _ => {
    const value = { minNumber, maxNumber, language, showAnswer }
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(storageKey, jsonValue)
  }

  const startGame = async _ => {
    await saveSettings()
    EventBus.emit('closeSettings')
  }

  useEffect(_ => {
    if (!prefs) loadSettings()
  })

  const languages = [
    { value: 'ar', label: 'Arabic' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'cz', label: 'Czech' },
    { value: 'dk', label: 'Danish' },
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'fa', label: 'Farsi' },
    { value: 'fr', label: 'French' },
    { value: 'he', label: 'Hebrew' },
    { value: 'zh', label: 'Chinese' },
    { value: 'hr', label: 'Croatian' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'it', label: 'Italian' },
    { value: 'ko', label: 'Korean' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'lv', label: 'Latvian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'no', label: 'Norwegian' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'sr', label: 'Serbian' },
    { value: 'es', label: 'Spanish' },
    { value: 'tr', label: 'Turkish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'vi', label: 'Vietnamese' },
  ]

  const [languageSelectOpen, setLanguageSelectOpen] = useState(false)

  const settingsData = [
    {
      type: 'SECTION',
      header: 'Numbers'.toUpperCase(),
      rows: [
        {
          title: 'From',
          renderAccessory: () => <TextInput
            editable
            onChangeText={number => setMinNumber(number)}
            value={0}
            inputMode='numeric'
          />,
        },
        {
          title: 'To',
          renderAccessory: () => <TextInput
            editable
            onChangeText={number => setMaxNumber(number)}
            value={1000}
            inputMode='numeric'
          />,
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Other'.toUpperCase(),
      rows: [
        {
          title: 'Immediately show the answer',
          renderAccessory: () => <Switch
            onValueChange={v => setShowAnswer(v)}
            value={showAnswer}
          />,
        },
        {
          title: 'Languge',
          showDisclosureIndicator: true,
        },
        {
          title: 'Text',
          renderAccessory: () => (
            <DropDownPicker
              open={languageSelectOpen}
              value={language}
              items={languages}
              setOpen={setLanguageSelectOpen}
              setValue={setLanguage}
            />
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      rows: [
        {
          renderAccessory: () => (
            <Button title='Start' color='red' onPress={_ => startGame}></Button>
          ),
        },
      ],
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navBarTitle}>Settings</Text>
      </View>
      <SettingsScreen
        data={settingsData}
      />
    </View>
  )
}

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'

const statusBarHeight = Platform.OS === 'ios' ? 35 : 35

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: '#8c231c',
    height: 44 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'white',
    fontFamily,
    fontSize: 17,
  },
})

import { useState }                                                    from 'react'
import { StyleSheet, Text, TextInput, View, Button, Switch, Platform } from 'react-native'
import DropDownPicker                                                  from 'react-native-dropdown-picker'
import { SettingsScreen }                                              from 'react-native-settings-screen'
import EventBus                                                        from 'just-event-bus'

export default function Settings(props) {
  const { prefs, saveSettings } = props

  const startGame = _ => {
    EventBus.emit('closeSettings')
  }

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
            onChangeText={minMumber => saveSettings({ minMumber })}
            value={prefs.minMumber}
            inputMode='numeric'
          />,
        },
        {
          title: 'To',
          renderAccessory: () => <TextInput
            editable
            onChangeText={maxNumber => saveSettings({ maxNumber })}
            value={prefs.maxNumber}
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
            onValueChange={showAnswer => saveSettings({ showAnswer })}
            value={prefs.showAnswer}
          />,
        },
        {
          title: 'Languge',
          showDisclosureIndicator: false,
        },
        {
          title: 'Text',
          renderAccessory: () => (
            <DropDownPicker
              open={languageSelectOpen}
              value={prefs.language}
              items={languages}
              setOpen={setLanguageSelectOpen}
              onValueChange={language => saveSettings({ language })}
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
            <Button title='Start' color='red' onPress={startGame}></Button>
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

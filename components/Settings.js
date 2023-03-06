import { useState, useRef }                               from 'react'
import { StyleSheet, Text, View, Switch, useColorScheme } from 'react-native'
import DropDownPicker                                     from 'react-native-dropdown-picker'
import EventBus                                           from 'just-event-bus'

import Button             from './Button'
import SettingsSection    from './SettingsSection'
import SettingsRow        from './SettingsRow'
import SettingNumberInput from './SettingsNumberInput'
import SettingLabel       from './SettingsLabel'

export default function Settings(props) {
  const colorScheme = useColorScheme()
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

  const minNumberRef = useRef()
  const maxNumberRef = useRef()

  const headerColor = colorScheme == 'dark' ? '#999' : 'grey'

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.header, color: headerColor }}>Configure</Text>
      <SettingsSection title='Numbers'>
        <SettingsRow onTouch={_ => minNumberRef.current.focus()}>
          <SettingLabel title="From" />
          <SettingNumberInput inputRef={minNumberRef} value={prefs.minNumber} onChange={minNumber => saveSettings({ minNumber })} />
        </SettingsRow>
        <SettingsRow>
          <SettingLabel title="To" />
          <SettingNumberInput inputRef={maxNumberRef} value={prefs.maxNumber} onChange={maxNumber => saveSettings({ maxNumber })} />
        </SettingsRow>
      </SettingsSection>
      <SettingsSection title='Other'>
        <SettingsRow>
          <SettingLabel title="Immediately show the answer" />
          <Switch
            onValueChange={showAnswer => saveSettings({ showAnswer })}
            value={prefs.showAnswer}
          />
        </SettingsRow>
      </SettingsSection>
      <SettingsSection title='Language'>
        <DropDownPicker
          open={languageSelectOpen}
          value={prefs.language}
          items={languages}
          setOpen={setLanguageSelectOpen}
          setValue={language => saveSettings({ language: language() })}
          listMode='MODAL'
          theme={colorScheme == 'dark' ? 'DARK' : 'LIGHT'}
        />
      </SettingsSection>
      <Button title='Start' color='red' onPress={startGame}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    alignContent: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    flexShrink: 0,
    flexGrow: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    padding: 10,
    gap: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 22,
    padding: 15,
  },
})

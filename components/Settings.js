import { useRef }                                                     from 'react'
import { StyleSheet, Text, ScrollView, View, Switch, useColorScheme } from 'react-native'
import EventBus                                                       from 'just-event-bus'

import Button             from './Button'
import SettingsSection    from './SettingsSection'
import SettingsRow        from './SettingsRow'
import SettingNumberInput from './SettingsNumberInput'
import SettingLabel       from './SettingsLabel'
import SettingsSelect     from './SettingsSelect'

export default function Settings(props) {
  const { prefs, saveSettings } = props
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const startGame = _ => {
    EventBus.emit('closeSettings')
  }

  const themes = [
    { value: '', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ]

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

  const minNumberRef = useRef()
  const maxNumberRef = useRef()

  const headerColor = theme === 'dark' ? '#999' : '#444'

  return (
    <View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} persistentScrollbar={true}>
        <Text style={{ ...styles.header, color: headerColor }}>Configure</Text>
        <SettingsSection prefs={prefs} title='Numbers'>
          <SettingsRow onTouch={_ => minNumberRef.current.focus()}>
            <SettingLabel prefs={prefs}title="From" />
            <SettingNumberInput prefs={prefs} inputRef={minNumberRef} value={prefs.minNumber} onChange={minNumber => saveSettings({ minNumber })} />
          </SettingsRow>
          <SettingsRow>
            <SettingLabel prefs={prefs}title="To" />
            <SettingNumberInput prefs={prefs} inputRef={maxNumberRef} value={prefs.maxNumber} onChange={maxNumber => saveSettings({ maxNumber })} />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title='Language'>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.language}
              values={languages}
              onChange={language => saveSettings({ language: language() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title='Theme'>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.theme}
              values={themes}
              onChange={theme => saveSettings({ theme: theme() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title='Other'>
          <SettingsRow>
            <SettingLabel prefs={prefs} title="Immediately show the answer" />
            <Switch
              onValueChange={showAnswer => saveSettings({ showAnswer })}
              value={prefs.showAnswer}
            />
          </SettingsRow>
        </SettingsSection>
      </ScrollView>
      <Button prefs={prefs} title='Start' color='red' onPress={startGame} style={{margin: 20}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    // height: 250,
    // maxHeight: '50%',
    // flexGrow: 0,
    // flex: 1,
    // width: null,
    // height: null,
  },
  container: {
    // flex: 1,
    // alignItems: 'stretch',
    // alignContent: 'stretch',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // flexShrink: 0,
    // flexGrow: 1,
    // backgroundColor: 'yellow',
    // maxWidth: '100%',
    // maxHeight: '100%',
    // padding: 10,
    // gap: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    padding: 10,
  },
})

import { useRef }                                                     from 'react'
import { StyleSheet, Text, ScrollView, View, Switch, useColorScheme } from 'react-native'
import EventBus                                                       from 'just-event-bus'

import * as Consts        from './Constants'
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
        <SettingsSection prefs={prefs} title='Numbers Language'>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.language}
              values={Consts.LANGUAGES}
              onChange={language => saveSettings({ language: language() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title='Interface Language'>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.locale}
              values={Consts.LOCALES}
              onChange={locale => saveSettings({ locale: locale() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title='Theme'>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.theme}
              values={Consts.THEMES}
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

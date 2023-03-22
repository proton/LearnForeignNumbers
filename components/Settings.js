import { useRef, useState, useEffect }                                from 'react'
import { StyleSheet, Text, ScrollView, View, Switch, useColorScheme } from 'react-native'
import EventBus                                                       from 'just-event-bus'

import * as Consts        from './Constants'
import Translate          from './Translate'
import Button             from './Button'
import Player             from './Player'
import SettingsSection    from './SettingsSection'
import SettingsRow        from './SettingsRow'
import SettingNumberInput from './SettingsNumberInput'
import SettingLabel       from './SettingsLabel'
import SettingsSelect     from './SettingsSelect'

export default function Settings(props) {
  const { prefs, saveSettings, voices } = props
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme
  const tr = Translate(prefs.locale)

  const player = new Player({voice: prefs.voice, language: prefs.language})

  const noVoice = { value: '-', label: tr('noVoice') }
  const generateLangVoices = language => {
    language = language || prefs.language
    const newLangVoices = voices.
      filter(voice => voice.language.startsWith(language)).
      map(voice => ({ value: (voice.identifier || voice.name), label: voice.name }))
    newLangVoices.push(noVoice)
    return newLangVoices
  }
  const [langVoices, setLangVoices] = useState(generateLangVoices())

  const changeLanguage = language => {
    const newLangVoices = generateLangVoices(language)
    const voice = (newLangVoices.find(voice => voice.value.includes('-language')) || newLangVoices[0]).value
    if (langVoices[0].value != newLangVoices[0].value) setLangVoices(newLangVoices)
    saveSettings({ voice: voice, language: language })
  }

  useEffect(_ => {
    if (!prefs.voice) changeLanguage(prefs.language)
  })

  const startGame = _ => EventBus.emit('closeSettings')
  const demoVoice = _ => player.sayNumber(563)
  const switchShowAnswer = _ => {
    const showAnswer = !prefs.showAnswer
    saveSettings({ showAnswer })
  }

  const minNumberRef = useRef()
  const maxNumberRef = useRef()

  const headerColor = theme === 'dark' ? '#999' : '#444'

  const themes = Consts.THEMES.map(theme => ({ value: theme, label: tr(`theme_${theme}`) }))
  const languages = Consts.LANGUAGES.map(lang => ({ value: lang, label: tr(`language_${lang}`) }))

  return (
    <View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} persistentScrollbar={true}>
        <Text style={{ ...styles.header, color: headerColor }}>{tr('configure')}</Text>
        <SettingsSection prefs={prefs} title={tr('numbers')}>
          <SettingsRow onTouch={_ => minNumberRef.current.focus()}>
            <SettingLabel prefs={prefs} title={tr('from')} />
            <SettingNumberInput prefs={prefs} inputRef={minNumberRef} value={prefs.minNumber} onChange={minNumber => saveSettings({ minNumber })} accessibilityHint={tr('from')} />
          </SettingsRow>
          <SettingsRow onTouch={_ => maxNumberRef.current.focus()}>
            <SettingLabel prefs={prefs} title={tr('to')} />
            <SettingNumberInput prefs={prefs} inputRef={maxNumberRef} value={prefs.maxNumber} onChange={maxNumber => saveSettings({ maxNumber })} accessibilityHint={tr('to')}  />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title={tr('numbersLanguage')}>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.language}
              values={languages}
              onChange={value => changeLanguage(value())}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title={tr('voice')}>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.voice}
              values={langVoices}
              disabled={langVoices.length === 1}
              onChange={value => saveSettings({ voice: value() })}
            />
            { player.voicePresent() && <Button prefs={prefs} color='ebony' icon='AntDesign/sound' onPress={demoVoice} /> }
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title={tr('uiLanguage')}>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.locale}
              values={Consts.LOCALES}
              onChange={value => saveSettings({ locale: value() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title={tr('theme')}>
          <SettingsRow>
            <SettingsSelect
              prefs={prefs}
              value={prefs.theme}
              values={themes}
              onChange={value => saveSettings({ theme: value() })}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection prefs={prefs} title={tr('other')}>
          <SettingsRow onTouch={switchShowAnswer}>
            <SettingLabel prefs={prefs} title={tr('imediatelyShowAnswer')} />
            <Switch
              onChange={switchShowAnswer}
              value={prefs.showAnswer}
            />
          </SettingsRow>
        </SettingsSection>
      </ScrollView>
      <Button prefs={prefs} title={tr('start')} color='red' onPress={startGame} style={{margin: 20}}></Button>
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

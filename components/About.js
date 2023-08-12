import { StyleSheet, Text, Linking, View } from 'react-native'
import EventBus                            from 'just-event-bus'

import Translate from './Translate'
import Button    from './Button'

export default function About(props) {
  const { prefs } = props
  const tr = Translate(prefs.locale)

  const closeWindow = _ => EventBus.emit('openGame')

  const theme = prefs.computedTheme
  const headerColor = theme === 'dark' ? '#999' : '#444'
  const textColor = theme === 'dark' ? '#999' : '#444'

  const githubUrl = 'https://github.com/proton/LearnForeignNumbers'

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.header, color: headerColor }}>{tr('about')}</Text>

      <View style={{ height: '50%' }}>
        <Text
          style={{ ...styles.text, color: textColor }}
          onPress={() => Linking.openURL(githubUrl)}
        >
          {githubUrl}
        </Text>
        <Text style={{ ...styles.text, color: textColor }}>Petr Savichev</Text>
      </View>

      <Button prefs={prefs} title={tr('back')} color='red' onPress={closeWindow} style={{margin: 20}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:        'flex',
    flexDirection:  'column',
    height:         '100%',
    justifyContent: 'space-between',
  },
  header: {
    fontSize:  26,
    padding:   10,
    textAlign: 'center',
  },
  text: {
    fontSize:  16,
    padding:   10,
    textAlign: 'center',
  },
})

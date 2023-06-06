import { StyleSheet, Text, ScrollView, View, useColorScheme } from 'react-native'
import EventBus                                               from 'just-event-bus'

import Translate from './Translate'
import Button    from './Button'

export default function About(props) {
  const { prefs } = props
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme
  const tr = Translate(prefs.locale)

  const closeWindow = _ => EventBus.emit('openGame')

  const headerColor = theme === 'dark' ? '#999' : '#444'
  const textColor = theme === 'dark' ? '#999' : '#444'

  return (
    <View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} persistentScrollbar={true}>
        <Text style={{ ...styles.header, color: headerColor }}>{tr('about')}</Text>

        <Text style={{ ...styles.text, color: textColor }}>https://github.com/proton/LearnForeignNumbers</Text>
        <Text style={{ ...styles.text, color: textColor }}>Petr Savichev</Text>
      </ScrollView>
      <Button prefs={prefs} title={tr('back')} color='red' onPress={closeWindow} style={{margin: 20}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
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

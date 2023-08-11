import { StyleSheet, View, Text, useColorScheme } from 'react-native'

export default function SettingsSection({ prefs, title, children }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const labelColor = theme === 'dark' ? '#ccc' : '#333'

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, color: labelColor }}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection:     'column',
    marginBottom:      10,
    marginTop:         5,
    paddingBottom:     5,
    paddingHorizontal: 7,
    paddingTop:        0,
  },
  label: {
    fontSize:     20,
    fontWeight:   'bold',
    marginBottom: 2,
  },
})

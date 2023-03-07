import { StyleSheet, View, Text, useColorScheme } from 'react-native'

export default function SettingsSection({ prefs, title, children }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const labelColor = theme === 'dark' ? '#999' : '#333'

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, color: labelColor }}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})

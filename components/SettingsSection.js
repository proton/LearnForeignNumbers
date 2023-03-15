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
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 7,
    paddingTop: 0,
    paddingBottom: 5,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
})

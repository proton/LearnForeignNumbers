import { StyleSheet, Text, useColorScheme } from 'react-native'

export default function SettingLabel({ prefs, title }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const labelColor = theme === 'dark' ? '#aaa' : '#111'

  return (
    <Text style={{ ...styles.label, color: labelColor }}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
})

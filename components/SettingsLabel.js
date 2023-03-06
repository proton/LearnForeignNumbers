import { StyleSheet, Text, useColorScheme } from 'react-native'

export default function SettingLabel({ title }) {
  const colorScheme = useColorScheme()

  const labelColor = colorScheme == 'dark' ? '#999' : 'grey'

  return (
    <Text style={{ ...styles.label, color: labelColor }}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#111',
    fontSize: 18,
  },
})

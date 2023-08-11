import { StyleSheet, Text } from 'react-native'

export default function SettingLabel({ prefs, title }) {
  return (
    <Text style={{ ...styles.label, ...prefs.styles.settingsText }}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
})

import { StyleSheet, Text } from 'react-native'

export default function SettingLabel(props) {
  const { title } = props

  return (
    <Text style={styles.label}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#111',
    fontSize: 18,
  },
})

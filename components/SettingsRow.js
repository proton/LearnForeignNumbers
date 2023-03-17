import { StyleSheet, TouchableOpacity } from 'react-native'

export default function SettingsRow(props) {
  const { children, onTouch } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onTouch}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    // https://support.google.com/accessibility/android/answer/7101858
    minHeight: 48,
  },
})

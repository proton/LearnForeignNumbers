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
    alignItems:     'center',
    flexDirection:  'row',
    gap:            20,
    justifyContent: 'space-between',
    // https://support.google.com/accessibility/android/answer/7101858
    minHeight:      48,
    width:          '100%',
  },
})

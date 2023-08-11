import { StyleSheet, TextInput } from 'react-native'

export default function SettingNumberInput({ prefs, value, onChange, inputRef, accessibilityHint }) {
  return (
    <TextInput
      ref={inputRef}
      style={{ ...styles.element, ...prefs.styles.settingsText }}
      onChangeText={number => onChange(+number || 0)}
      value={value.toString()}
      inputMode='numeric'
      keyboardType='numeric'
      accessibilityHint={accessibilityHint}
    />
  )
}

const styles = StyleSheet.create({
  element: {
    fontSize:  20,
    minHeight: 48, // https://support.google.com/accessibility/android/answer/7101858
    textAlign: 'right',
    width:     90,
  },
})

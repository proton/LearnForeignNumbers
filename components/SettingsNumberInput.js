import { StyleSheet, TextInput, useColorScheme } from 'react-native'

export default function SettingNumberInput({ prefs, value, onChange, inputRef, accessibilityHint }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const textColor = theme === 'dark' ? '#aaa' : '#111'

  return (
    <TextInput
      ref={inputRef}
      style={{ ...styles.element, color: textColor }}
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
    width: 90,
    textAlign: 'right',
    fontSize: 20,
    minHeight: 48, // https://support.google.com/accessibility/android/answer/7101858
  },
})

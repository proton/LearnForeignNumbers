import { StyleSheet, TextInput, useColorScheme } from 'react-native'

export default function SettingNumberInput({ prefs, value, onChange, inputRef }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const textColor = theme === 'dark' ? '#999' : '#111'

  return (
    <TextInput
      ref={inputRef}
      style={{ ...styles.element, color: textColor }}
      onChangeText={number => onChange(+number || 0)}
      value={value.toString()}
      inputMode='numeric'
      keyboardType='numeric'
    />
  )
}

const styles = StyleSheet.create({
  element: {
    width: 90,
    textAlign: 'right',
    fontSize: 20,
  },
})

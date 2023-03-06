import { StyleSheet, TextInput, useColorScheme } from 'react-native'

export default function SettingNumberInput({ value, onChange, inputRef }) {
  const colorScheme = useColorScheme()

  const textColor = colorScheme == 'dark' ? '#999' : 'grey'

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
